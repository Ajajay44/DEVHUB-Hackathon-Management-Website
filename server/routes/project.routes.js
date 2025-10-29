// server/routes/project.routes.js
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const Project = require('../models/project.model.js');
const Team = require('../models/team.model.js');
const User = require('../models/user.model.js');

const router = express.Router();

// ---
// @route   POST /api/projects/submit
// @desc    Create or update a project submission
// @access  Private
// ---
router.post('/submit', authMiddleware, async (req, res) => {
  const { title, description, githubLink, demoLink } = req.body;
  const userId = req.user.id;

  try {
    // 1. Find the user and their team
    const user = await User.findById(userId);
    if (!user.team) {
      return res.status(400).json({ msg: 'You must be on a team to submit a project.' });
    }
    const team = await Team.findById(user.team);

    // 2. Check if a project already exists for this team
    let project = await Project.findOne({ team: team._id });

    if (project) {
      // If project exists, update it
      project.title = title;
      project.description = description;
      project.githubLink = githubLink;
      project.demoLink = demoLink;
      await project.save();
      res.status(200).json({ msg: 'Project updated successfully', project });
    } else {
      // If project doesn't exist, create it
      project = new Project({
        team: team._id,
        title,
        description,
        githubLink,
        demoLink,
      });
      await project.save();

      // 3. Link this new project to the team
      team.project = project._id;
      await team.save();
      
      res.status(201).json({ msg: 'Project submitted successfully', project });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ---
// @route   GET /api/projects/my-project
// @desc    Get the current team's project
// @access  Private
// ---
router.get('/my-project', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.team) {
      return res.status(404).json({ msg: 'You are not on a team.' });
    }

    // 1. Find the project using the team ID
    const project = await Project.findOne({ team: user.team });

    if (!project) {
      return res.status(404).json({ msg: 'Your team has not submitted a project yet.' });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// This is the CommonJS way to export
module.exports = router;