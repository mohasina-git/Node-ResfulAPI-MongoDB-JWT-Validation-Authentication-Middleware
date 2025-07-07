import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send(`User with emailId: ${email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res
      .status(500)
      .send(`Error occurred while registering user: ${err.message}`);
  }
};

export const loginUser = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30m" });
    res.json({ token });
  } catch (err) {
    res.status(500).send(`Error occurred while loginUser: ${err.message}`);
  }
};
