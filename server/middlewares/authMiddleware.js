const jwt = require("jsonwebtoken");
const User = require('../models/User');

const protect = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    }

    if (!token) return res.status(401).json({ msg: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token fails validation" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });
    next();
};

module.exports = { protect, adminOnly };
