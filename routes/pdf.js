const router = require('express').Router();
const puppeteer = require('puppeteer');

// GET /api/pdf — public
router.get('/', async (_req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1080 });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3010';
    await page.goto(`${frontendUrl}/myresume`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for resume content to fully render
    await page.waitForSelector('#resume-content', { timeout: 10000 });

    // Inject print CSS:
    // - Hide download button bar
    // - Replace profile photo with initials box (removes 2-4 MB of base64 image)
    // - Keep exact layout, colors, fonts
    await page.addStyleTag({
      content: `
        .resume-topbar { display: none !important; }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `,
    });

    const pdfData = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
    });

    // puppeteer v21+ returns Uint8Array — convert to Buffer for Express
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
