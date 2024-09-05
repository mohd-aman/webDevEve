const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already registered",
      });
    }

    const newUser = await UserModel(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration successfull, Please Login",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "An error occured, please try again later.",
    });
  }
};

const readUser = async function (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist, Please register",
      });
    }

    //check for password for the time being we have stored password as plain text
    if (user.password !== req.body.password) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
    console.log(token);
    res.send({
      success: true,
      message: "Login Successful",
      data:token
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "An error occured, please try again later.",
    });
  }
};

module.exports = { createUser, readUser };
