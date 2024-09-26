const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const EmailHelper = require("../utils/emailHelper");

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

    // Hash the password before saving it into the database
    const saltRounds = 10; // higher the saltRounds, the more secure the pass but slower the hashing
    const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);

    newUser.password = hashedPassword; // replace the plain text password with the hashed one
    
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
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
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

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId).select("-password");
    res.send({
      success: true,
      message: "You are Authenticated",
      data: user,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
}

const generateOtp = ()=>{
  const otp = Math.floor(Math.random()*100000) + 90000;
  return otp;
}

const forgotPassword = async (req,res)=>{
  try{
    //1. you can ask for email
    //2. check if the email exists
        //2.1 if it exists, create an OTP and send it to the user email
        //2.2 if it does not exist, send a response that it does not exist
    //3 generate an OTP and expiry store it in the database corresponding to the user email
    //4. res with otp.
    //5. send the otp to the user email
    if(req.body.email === undefined){
      return res.send({
        success:false,
        message:"Email is required"
      })
    }
    const user = await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.send({
        success:false,
        message:"User with Email does not exist"
      })
    }
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5*60*1000;
    await user.save();
    res.send({
      success:true,
      message:"OTP sent to your email"
    })
    await EmailHelper("otp.html",user.email,{name:user.name,otp:user.otp},"OTP for BookMyShowClone")
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
}

const resetPassword = async (req,res)=>{
  try{
    const resetDetails = req.body;
    if(!resetDetails.password || !resetDetails.otp){
      return res.send({
        success:false,
        message:"Password and OTP are required"
      })
    }
    const user = await UserModel.findOne({otp:resetDetails.otp});
    if(!user){
      return res.send({
        success:false,
        message:"Invalid OTP"
      })
    }
    if(user.otpExpiry < Date.now()){ //otp has expired
       return res.send({
        success:false,
        message:"OTP has expired"
       })
    }
    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.send({
      success:true,
      message:"Password reset successful"
    })
  }catch(err){
    res.send({
      success:false,
      message:err.message
    })
  }
}


module.exports = { createUser, readUser,getCurrentUser,forgotPassword, resetPassword };
