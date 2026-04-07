const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Note: using bcryptjs as installed heavily already

const registerUser = async (req, res) => {
    try {
        let { name, email, password, adminPasscode } = req.body;
        email = email.toLowerCase();
        
        // Ensure first user is admin, or explicitly requested via passcode
        const usersCount = await User.countDocuments({});
        const role = (usersCount === 0 || adminPasscode === 'admin123') ? 'admin' : 'user';

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'SECRET', { expiresIn: '30d' });
        
        res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log(`[Login Failed] User not found for email: ${email}`);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            console.log(`[Login Failed] Password mismatch for email: ${email}. Provided password length: ${password?.length}, stored password length: ${user.password?.length}`);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'SECRET', { expiresIn: '30d' });
        res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logoutUser = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getUsers };
