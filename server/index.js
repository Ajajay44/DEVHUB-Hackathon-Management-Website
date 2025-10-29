// server/index.js
require('dotenv').config(); // Loads .env file contents into process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import our route files
const authRoutes = require('./routes/auth.routes.js');
const teamRoutes = require('./routes/team.routes.js');
const projectRoutes = require('./routes/project.routes.js');
const adminRoutes = require('./routes/admin.routes.js'); // The new admin routes

// --- 1. INITIALIZE APP ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. MIDDLEWARE ---
app.use(cors()); // Allows our frontend (on port 3000) to talk to this server (on port 5000)
app.use(express.json()); // Allows the server to understand JSON data sent in request bodies

// --- 3. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 4. API ROUTES ---
// A simple test route to make sure the server is alive
app.get('/', (req, res) => {
  res.send('API is running...');
});

// "Plug in" our route files
app.use('/api/auth', authRoutes); // All auth routes (like /login)
app.use('/api/teams', teamRoutes); // All team routes (like /create)
app.use('/api/projects', projectRoutes); // All project routes (like /submit)
app.use('/api/admin', adminRoutes); // All admin routes (like /all-projects)

// --- 5. START THE SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});