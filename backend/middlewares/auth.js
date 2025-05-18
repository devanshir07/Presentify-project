const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'Token verification failed, authentication denied'
            });
        }

    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error in auth middleware'
        });
    }
};

module.exports = auth;