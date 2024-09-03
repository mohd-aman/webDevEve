const UserModel = require('../models/userModel');

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
        message: "Registration successfull, please Login",
      });
    } catch (err) {
      console.log(err);
      res.send({
        success:false,
        message:"An error occured, please try again later."
    });
    }
  }

  const readUser = async function (req,res){
    try{
      const user = await UserModel.findOne({email:req.body.email});
      if(!user){
        return res.send({
            success:false,
            message:"User does not exist, Please register"
        })
      }

      //check for password for the time being we have stored password as plain text
      if(user.password !== req.body.password){
        return res.send({
            success:false,
            message:"Invalid Password"
        })
      }

      res.send({
        success:true,
        message:"Login Successful",
      })

    }catch(err){
        console.log(err);
        res.send({
            success:false,
            message:"An error occured, please try again later."
        });
    }
  }

  module.exports = {createUser,readUser}

