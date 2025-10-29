// server/models/team.model.js
const mongoose = require('mongoose');
const shortid = require('shortid');

// 1. Define the schema (the blueprint) for a team
const TeamSchema = new mongoose.Schema({
  // Field for the team's name
  teamName: {
    type: String,
    required: true,
    unique: true, // No two teams can have the same name
  },
  // Field for the team's leader
  leader: {
    type: mongoose.Schema.Types.ObjectId, // Stores the unique ID of a User
    ref: 'User', // Links this field to the 'User' model
    required: true,
  },
  // Field for the team members
  members: [ // The square brackets indicate this is an array (a list)
    {
      type: mongoose.Schema.Types.ObjectId, // The array will store User IDs
      ref: 'User', // Each ID in the array is linked to the 'User' model
    },
  ],
  // Field for the team's invitation code
  invitationCode: {
    type: String,
    unique: true,
    default: shortid.generate, // Automatically runs shortid.generate on creation
  },
  
  // Field to link to this team's project submission
  project: {
    type: mongoose.Schema.Types.ObjectId, // Stores the unique ID of a Project
    ref: 'Project', // Links this field to the 'Project' model
    default: null, // Default value is null (no project submitted yet)
  },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// 2. Compile the schema into a Mongoose model
const Team = mongoose.model('Team', TeamSchema);

// 3. Export the model using CommonJS
module.exports = Team;