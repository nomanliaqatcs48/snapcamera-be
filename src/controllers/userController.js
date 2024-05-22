import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create(userData);
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "User Register successfully!",
      user,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ code: 500, status: "Error", error });
  }
};

// Login User
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        // const token = jwt.sign({ id: user._id }, "secret", {
        //   expiresIn: "1y",
        // });
        const userObject = user.toObject();
        delete userObject.password;
        res.status(200).json({
          code: 200,
          status: "Success",
          message: "Successfully logedIn",
          user: userObject,
          // token,
        });
      } else {
        res.status(400).json({
          code: 400,
          status: "Error",
          message: "Invalid email/password",
        });
      }
    } else {
      res.status(400).json({
        code: 400,
        status: "Error",
        message: "Invalid email/password",
      });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ code: 500, status: "Error", error });
  }
};

// Update User Data

export const userUpdate = async (req, res, next) => {
  try {
    const saveData = req.body;
    const user = await User.findOne({ _id: saveData.id });
    user.name = saveData.name;
    user.email = saveData.email;

    await user.save();
    const userObject = user.toObject();

    res.status(200).json({
      code: 200,
      status: "Success",
      message: "User date updated!",
      user: userObject,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ code: 500, status: "Error", error });
  }
};

//get all users
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "User fetched successfully!",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
