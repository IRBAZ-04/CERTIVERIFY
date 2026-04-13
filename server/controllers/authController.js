const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Note: using bcryptjs as installed heavily already

const registerUser = async (req, res) => {
    try {
        let { name, email, password, adminPasscode } = req.body;
        email = email.toLowerCase();
        
        // Assign role: only admin if correct passcode provided
        const role = (adminPasscode === 'AmdoxAdmin9870') ? 'admin' : 'user';

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET || 'SECRET', { expiresIn: '30d' });
        
        res.json({ token, role: user.role, name: user.name, email: user.email });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already registered. Please login instead.' });
        }
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

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET || 'SECRET', { expiresIn: '30d' });
        res.json({ token, role: user.role, name: user.name, email: user.email });
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

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name, email: user.email }, 
            process.env.JWT_SECRET || 'SECRET', 
            { expiresIn: '30d' }
        );
        
        res.json({ message: 'Password updated successfully', token, role: user.role, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getUsers, updatePassword };
