const JWT = require('jsonwebtoken');
const users = require('../models/users');

// Middleware to require sign-in
const requireSignIn = async (req, res, next) => {
    try {
        // Check if the authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        // Extract the token from the authorization header
        const token = authHeader; // Directly use the header value since it's not a Bearer token

        // Verify the JWT token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error and return a 401 Unauthorized response
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        // Fetch the user by ID
        const user = await users.findById(req.user._id);

        // Check if the user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Check if the user is an admin
        if (user.role !== "1") {
            return res.status(403).send({
                success: false,
                message: "Access denied: Unauthorized"
            });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error and return a 401 Unauthorized response
        console.error("Admin check error:", error);
        return res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        });
    }
};

module.exports = { requireSignIn, isAdmin };



