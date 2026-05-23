const router = require('express').Router();
const Profile = require('../models/Profile');
const requireAuth = require('../middleware/auth');

// ─── GET /api/profile — PUBLIC, no token required ────────────────────────────
// Returns the full portfolio profile for anyone (visitors, frontend).
router.get('/', async (_req, res) => {
  try {
    const profile = await Profile.findOne({}, { __v: 0, createdAt: 0, updatedAt: 0 });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile.toObject());
  } catch (err) {
    console.error('GET /api/profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/profile — JWT required ────────────────────────────────────────
// Creates the profile document. Used only when no profile exists yet.
router.post('/', requireAuth, async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      return res.status(409).json({ success: false, error: 'Profile already exists. Use PUT to update.' });
    }
    const data = { ...req.body };
    delete data._id;
    delete data.__v;
    const profile = await Profile.create(data);
    res.status(201).json({ success: true, profile: profile.toObject() });
  } catch (err) {
    console.error('POST /api/profile error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ─── PUT /api/profile — JWT required ─────────────────────────────────────────
// Replaces the full profile document (upserts if missing).
router.put('/', requireAuth, async (req, res) => {
  try {
    const data = { ...req.body };
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true, runValidators: false }
    );
    res.json({ success: true, profile: profile.toObject() });
  } catch (err) {
    console.error('PUT /api/profile error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ─── DELETE /api/profile — JWT required ──────────────────────────────────────
// Resets the profile back to empty / deletes the document.
router.delete('/', requireAuth, async (req, res) => {
  try {
    await Profile.deleteMany({});
    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/profile error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
