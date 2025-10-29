// server/routes/auth.routes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // Import our User model
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// ROUTE: POST /api/auth/register
// DESC:  Register a new user
router.post('/register', async (req, res) => {
    try {
        // 1. Get name, email, and password from the request body
        const { name, email, password } = req.body;

        // 2. Check if a user with this email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists.' });
        }

        // 3. Create a new user instance based on our model
        user = new User({
            name,
            email,
            password,
        });

        // 4. Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 5. Save the new user to the database
        await user.save();
        
        // 6. Send a success response back
        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
const jwt = require('jsonwebtoken'); // Make sure you import jsonwebtoken at the top

// ROUTE: POST /api/auth/login
// DESC:  Authenticate a user and return a token
router.post('/login', async (req, res) => {
    try {
        // 1. Get email and password from the request body
        const { email, password } = req.body;

        // 2. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        // 3. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        // 4. If credentials are correct, create a JWT payload
        const payload = {
            user: {
                id: user.id, // This includes the user's unique ID in the token
            },
        };

        // 5. Sign the token with your secret key
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Token expires in 5 hours
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // 6. Send the token back to the client
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// ROUTE: GET /api/auth/me
// DESC:  Get the logged-in user's data
// ACCESS: Private (requires a token)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // req.user.id is available because our middleware added it
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;