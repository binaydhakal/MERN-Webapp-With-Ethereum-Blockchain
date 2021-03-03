const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtExpire, jwtSecret } = require("../config/dev");

exports.signupController = async (req, res) => {
  const { username, email, phonenumber, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const phnumber = await User.findOne({ phonenumber });
    if (user) {
      res.status(400).json({
        errorMessage: "Email already exit",
      });
    } else if (phnumber) {
      res.status(400).json({
        errorMessage: "Phone number has been already  used",
      });
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.phonenumber = phonenumber;

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      res.json({
        successMessage: "Registration success, Please signin.",
      });
    }
  } catch (error) {
    console.log("signupController error:", error);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};


exports.signinController = async (req, res) => {
 
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
     return res.status(400).json({
        errorMessage: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid Credentials",
      });
    }

    const payload = {
      user: {
        _id: user._id,
      }
    }

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (error, token) => {
      if(error){console.log('jwt error', error);}

      const { _id, username, phonenumber, email, role } = user;

      res.json({
        token,
        user: { _id, username, phonenumber, email, role }
      });
    });

  } catch (error) {
    console.log("signinController error:", error);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }

};
