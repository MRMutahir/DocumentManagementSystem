import { User } from "../modalShema/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const userBody = req.body;

  try {
    // Use async/await for bcrypt functions
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...userBody, password: hash });
    await newUser.save();

    res.status(201).json({ message: "User has been created!" });
  } catch (error) {
    // Use the next function to pass the error to the error handling middleware
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    // Use findOne with the email or username, assuming 'name' is the username
    const user = await User.findOne({ $or: [{ name }, { email: name }] });

    if (!user) {
      throw createError(401, "Invalid credentials");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT);
      res.status(200).json({ token, message: "User has been logged in!" });
    } else {
      throw createError(401, "Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
