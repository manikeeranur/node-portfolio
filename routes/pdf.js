const router = require('express').Router();

async function launchBrowser() {
  if (process.platform === 'linux') {
    const chromium = require('@sparticuz/chromium');
    const puppeteer = require('puppeteer-core');
    return puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const puppeteer = require('puppeteer');
  return puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
}

// GET /api/pdf — public
router.get('/', async (_req, res) => {
  let browser = null;
  try {
    browser = await launchBrowser();

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1080 });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3010';
    console.log('PDF: navigating to', `${frontendUrl}/myresume`);
    await page.goto(`${frontendUrl}/myresume`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    await page.waitForSelector('#resume-content', { timeout: 15000 });

    await page.addStyleTag({
      content: `
        .resume-topbar { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      `,
    });

    const pdfData = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
    });

    const pdfBuffer = Buffer.isBuffer(pdfData) ? pdfData : Buffer.from(pdfData);

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Manikandan_Resume.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);

  } catch (err) {
    console.error('PDF generation error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate PDF', detail: err.message });
    }
  } finally {
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
  }
});

module.exports = router;
