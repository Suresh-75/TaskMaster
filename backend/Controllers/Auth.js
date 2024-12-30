const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password cannot be empty");
    }
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        status: "Fail",
        msg: "Login failed, user is not present",
      });
    let isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      const token = jwt.sign({ id: user._id }, "SECRETKEY", {
        expiresIn: "30 days",
      });
      res.json({
        status: "Login Success",
        user,
        token,
      });
    } else {
      res.json({
        status: "Fail",
        msg: "Login failed, Email or password incorrect",
      });
    }
  } catch (err) {
    // console.log(err);
    res.json({
      status: "err",
      message: err.message,
    });
  }
};

exports.handleSignUp = async (req, res) => {
  try {
    let { name, password, email } = req.body;
    password = await bcrypt.hash(password, 12);
    // console.log(name, email);
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email alreay exisiting");
    }
    const currentUser = await User.create({ name, email, password });
    // console.log(currentUser);
    const token = jwt.sign({ id: currentUser._id }, "SECRETKEY", {
      expiresIn: "30 days",
    });
    // console.log(token);
    res.json({
      status: "signup Succss",
      user: currentUser,
      token,
    });
  } catch (err) {
    res.json({
      status: "Fail",
      msg: err.message,
    });
  }
};

exports.isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error("LogIn to use this route/ no token available");
    }
    jwt.verify(token, "SECRETKEY", (err, decoded) => {
      if (err) throw new Error("Login to use this route/ invalid token");
      next();
    });
  } catch (err) {
    // console.log(err);
    return res.json({
      status: "err",
      msg: err.message,
    });
  }
};
