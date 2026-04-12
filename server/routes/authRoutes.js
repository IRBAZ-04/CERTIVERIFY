const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getUsers,
    updatePassword
} = require('../controllers/authController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.put('/password', protect, updatePassword);
router.route('/users')
    .get(protect, adminOnly, getUsers);

module.exports = router;
