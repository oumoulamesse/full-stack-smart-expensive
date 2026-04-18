const express = require('express');
const router = express.Router();

const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;