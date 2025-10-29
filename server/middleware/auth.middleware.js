// server/middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // 1. Get token from the header
    const token = req.header('x-auth-token');

    // 2. Check if token doesn't exist
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Add user from payload to the request object
        req.user = decoded.user;
        next(); // Move on to the next piece of middleware or the route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
}

module.exports = authMiddleware;