// server/models/project.model.js
const mongoose = require('mongoose');

// 1. Define the schema (the blueprint) for a project
const ProjectSchema = new mongoose.Schema({
  // Field to link this project to a specific team
  team: {
    type: mongoose.Schema.Types.ObjectId, // Stores the unique ID of a Team
    ref: 'Team', // Links this field to the 'Team' model
    required: true,
    unique: true, // A team can only have one submission
  },
  // Field for the project's title
  title: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning/end
  },
  // Field for the project's description
  description: {
    type: String,
    required: true,
  },
  // Field for the project's GitHub link
  githubLink: {
    type: String,
    trim: true,
  },
  // Field for the project's demo link
  demoLink: {
    type: String,
    trim: true,
  },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// 2. Compile the schema into a Mongoose model
const Project = mongoose.model('Project', ProjectSchema);

// 3. Export the model using CommonJS
module.exports = Project;