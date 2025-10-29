// server/middleware/admin.middleware.js
const User = require('../models/user.model.js');

const adminMiddleware = async (req, res, next) => {
  // 1. We get req.user.id from the first 'authMiddleware'
  const userId = req.user.id;

  try {
    // 2. Find the user in the database
    const user = await User.findById(userId);

    // 3. Check if the user exists and if their role is 'admin'
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    if (user.role !== 'Admin') {
      return res.status(403).json({ msg: 'Access denied. Admin role required.' });
    }

    // 4. If they are an admin, let them proceed
    next();

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = adminMiddleware;