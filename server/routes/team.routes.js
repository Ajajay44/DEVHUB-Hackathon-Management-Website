// server/routes/team.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Team = require('../models/team.model');
const User = require('../models/user.model');

// ---
// @route   POST /api/teams/create
// @desc    Create a new team
// @access  Private
// ---
router.post('/create', authMiddleware, async (req, res) => {
  const { teamName } = req.body;
  const userId = req.user.id; // From our authMiddleware

  try {
    // 1. Check if user is already on a team
    const user = await User.findById(userId);
    if (user.team) {
      return res.status(400).json({ msg: 'You are already on a team.' });
    }

    // 2. Check if team name is taken
    let team = await Team.findOne({ teamName });
    if (team) {
      return res.status(400).json({ msg: 'Team name is already taken.' });
    }

    // 3. Create and save the new team
    team = new Team({
      teamName,
      leader: userId,
      members: [userId], // Add the leader as the first member
    });
    await team.save();

    // 4. Update the user's document to link them to this new team
    user.team = team._id;
    await user.save();

    res.status(201).json({ msg: 'Team created successfully', team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ---
// @route   POST /api/teams/join
// @desc    Join a team using an invitation code
// @access  Private
// ---
router.post('/join', authMiddleware, async (req, res) => {
  const { invitationCode } = req.body;
  const userId = req.user.id;

  try {
    // 1. Check if user is already on a team
    const user = await User.findById(userId);
    if (user.team) {
      return res.status(400).json({ msg: 'You are already on a team.' });
    }

    // 2. Find the team by the invitation code
    const team = await Team.findOne({ invitationCode });
    if (!team) {
      return res.status(404).json({ msg: 'Team not found. Invalid code.' });
    }

    // 3. Add the user to the team's members list
    team.members.push(userId);
    await team.save();

    // 4. Update the user's document to link them to this team
    user.team = team._id;
    await user.save();

    res.status(200).json({ msg: 'Successfully joined team', team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ---
// @route   GET /api/teams/my-team
// @desc    Get details of the user's current team
// @access  Private
// ---
router.get('/my-team', authMiddleware, async (req, res) => {
  try {
    // 1. Find the user to get their team ID
    const user = await User.findById(req.user.id);
    if (!user.team) {
      return res.status(404).json({ msg: 'You are not on a team yet.' });
    }

    // 2. Find the team and populate the member details
    const team = await Team.findById(user.team)
      .populate('leader', 'name email') // Replace leader ID with their name & email
      .populate('members', 'name email'); // Replace member IDs with their name & email

    if (!team) {
      // This case might happen if a team was deleted but user link wasn't cleared
      return res.status(404).json({ msg: 'Team details not found.' });
    }

    res.status(200).json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;