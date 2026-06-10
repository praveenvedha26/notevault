import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user
    const user = await User.create({ name, email, password: hashedPassword });

    // 5. Return response
    return res.status(201).json({ message: "User created successfully", userId: user._id });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT token
    const token =  jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    // 5. Return response
    return res.status(200).json({ message: "Login successful", token, userId: user._id });
};