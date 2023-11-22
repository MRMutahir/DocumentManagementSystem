import { User } from "../modalShema/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// Create  user

// ...

const signup = async (req, res, next) => {
  const userBody = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({ ...userBody, password: hash });
    await newUser.save();

    res.status(200).json({ message: "User has been created!" });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

// Login user
const signin = async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ name: name });
  // console.log(user);
  const corectPasword = bcrypt.compareSync(password, user.password);
  console.log(corectPasword);
  if (corectPasword) {
    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    res.status(200).json({ token, message: "User has been login!" });
  }
};

// async function googleAuth(req, res) {
// }


export { signup, signin };
