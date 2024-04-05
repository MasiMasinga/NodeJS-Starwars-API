const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Authorization token is missing');
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (err) {
       return res.status(401).send('Invalid authorization token');
    }
};

module.exports = { authenticate };