const jwt = require('jsonwebtoken');

const generateToken = (id, sessionVersion = 0) => {
    return jwt.sign({ id, sv: sessionVersion }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
