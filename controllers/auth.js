const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
    const { firstName, surname, email, password } = req.body;

    if (!firstName) {
        return res.status(400).send('First name is required');
    };

    if (!surname) {
        return res.status(400).send('Surname is required');
    };

    if (!email) {
        return res.status(400).send('Email is required');
    };

    if (!email.includes('@')) {
        return res.status(400).send('Invalid email');
    };

    if (!email.includes('.')) {
        return res.status(400).send('Invalid email');
    };

    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters');
    };

    if (!password) {
        return res.status(400).send('Password is required');
    };

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(400).send('User already exists');
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        firstName: firstName,
        surname: surname,
        email: email,
        password: hashedPassword
    });

    await user.save();

    return res.status(201).json({ message: 'User created', user: user });
}


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    };

    if (!password) {
        return res.status(400).send('Password is required');
    };

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).send('User not found');
    };

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send('Invalid credentials');
    };

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.status(200).json({ message: 'Login successful', token: token });
}

module.exports = { signup, login };