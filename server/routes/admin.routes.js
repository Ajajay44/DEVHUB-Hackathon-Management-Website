// server/routes/admin.routes.js
const express = require('express');
const router = express.Router();

// Import our models
const Project = require('../models/project.model.js');
const User = require('../models/user.model.js');

// Import our middleware
const authMiddleware = require('../middleware/auth.middleware.js');
const adminMiddleware = require('../middleware/admin.middleware.js');

// ---
// @route   GET /api/admin/all-projects
// @desc    Get all project submissions
// @access  Private (Admin only)
// ---
router.get(
  '/all-projects',
  [authMiddleware, adminMiddleware], // 1. Chain the middleware
  async (req, res) => {
    try {
      // 2. Find all projects and populate team details
      const projects = await Project.find()
        .populate({
          path: 'team',
          select: 'teamName members',
          populate: {
            path: 'members',
            select: 'name email'
          }
        })
        .sort({ createdAt: -1 }); // Sort by newest first

      res.json(projects); // Send the list
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// ---
// @route   GET /api/admin/all-users
// @desc    Get all registered users
// @access  Private (Admin only)
// ---
router.get(
  '/all-users',
  [authMiddleware, adminMiddleware], // 6. Use both middleware again
  async (req, res) => {
    try {
      // 7. Find all users
      const users = await User.find()
        .populate('team', 'teamName') // 8. Populate team name if they are on one
        .select('-password') // 9. Exclude the password
        .sort({ createdAt: -1 });

      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// 10. Export the router in CommonJS
module.exports = router;