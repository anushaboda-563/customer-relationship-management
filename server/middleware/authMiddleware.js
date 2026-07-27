const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided"
            });
        }

        // Check if header starts with "Bearer "
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid Token Format"
            });
        }

        // Extract token from header
        const token = authHeader.split(" ")[1];

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save decoded user information
        req.user = decoded;

        // Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};

module.exports = protect;