import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Profile from "../models/profile.js";

// Helper — creates a signed JWT token for a user
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { fullName, username, email, password, template } = req.body;

    // 1. Check all fields are present
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Full name must be at least 2 characters
    if (fullName.trim().length < 2) {
      return res
        .status(400)
        .json({ message: "Full name must be at least 2 characters." });
    }

    // 3. Username: 3–20 chars, only letters, numbers, underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be 3–20 characters and can only contain letters, numbers, and underscores.",
      });
    }

    // 4. Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    // 5. Password must be at least 8 characters
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }

    // 6. Check if email or username is already taken
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already in use." });
    }

    // Hash password and create user + profile
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await Profile.create({
      username,
      fullName: fullName.trim(),
      template: template || 1,
    });

    const token = createToken(user._id);
    res
      .status(201)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check fields are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // 2. Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    // 3. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account found with that email." });
    }

    // 4. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = createToken(user._id);
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
