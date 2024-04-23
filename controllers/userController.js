const User = require("../Models/user");
const bcrypt = require("bcrypt");
const Token = require("../Models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/emailSender");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

//register
exports.register = async (req, res) => {
  let { username, email, password } = req.body;
  //check if user is available
  let userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "Username is not available" });
  }
  userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "Email already registered" });
  }

  //password encrypt
  let salt = await bcrypt.genSalt(saltRounds);
  let hashed_password = await bcrypt.hash(password, salt);
  //save user
  let newUser = await User.create({
    username,
    email,
    password: hashed_password,
  });
  if (!newUser) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  //send verification link in email
  let token = await Token.create({
    token: crypto.randomBytes(16).toString("hex"),
    user: newUser._id,
  });
  if (!token) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  const URL = `http://localhost:5000/verifyuser/${token.token}`;

  res.send(newUser);
  sendEmail({
    from: "noreply@something.com",
    to: email,
    subject: "Verification Email",
    text: "Please Click on the following link ",
    html: `<a href="${URL}"><button>Verify account</button></a>`,
  });
};
exports.verifyAccount = async (req, res) => {
  //check if token is valid
  let token = await Token.findOne({ token: req.params.token });
  if (!token) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may be expire" });
  }
  //find user
  let user = await User.findById(token.user);
  if (!user) {
    return res
      .status(400)
      .json({ error: "User Associated with token not found" });
  }
  //check if already verified
  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: "User already verified. Login to continue" });
  }
  //verify user
  user.isVerified = true;
  let saveUser = await user.save();
  if (!saveUser) {
    return res.status(500).json({ error: "Failed to verify" });
  }
  res.send({ message: "User verified successfully" });
};

// email verification

exports.resendVerification = async (req, res) => {
  //check if email is registered
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).json({ error: "Email Not registered" });
  }
  if (user.isVerified) {
    return res.status(400).json({
      error: "User already verified",
    });
  }
  let token = await Token.create({
    token: crypto.randomBytes(16).toString("hex"),
    user: user._id,
  });
  if (!token) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  const URL = `http://localhost:5000/verifyuser/${token.token}`;
  sendEmail({
    from: "noreply@something.com",
    to: user.email,
    subject: "Resend verification Email",
    text: "Please Click on the following link ",
    html: `<a href="${URL}"><button>Verify account</button></a>`,
  });
  res.send({ message: "Email verification Link has been sent to your email" });
};

exports.resetPassword = async (req, res) => {
  let token = await Token.create({
    token: crypto.randomBytes(16).toString("hex"),
    user: user._id,
  });
  if (!token) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
//signin
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  //check if email is registered or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email not registered" });
  }
  // check if password id correct or not
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res
      .status(400)
      .json({ message: "Password does not match with email." });
  }
  //check if user is verified or not
  if (!user.isVerified) {
    return res.status(400).json({ message: "Email not verified" });
  }

  const { _id, username, role } = user;
  //generate login token using jwt
  let token = jwt.sign(
    {
      id: user._id,
      email,
      role: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );

  //set data in cookies
  res.cookie("myCookie", token, { expire: 86400 });

  //send login info to frontend
  res.send({ token, user: { _id, email, role, username } });
};

//userDetails

exports.getUserDetails = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    res.send(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//userList
exports.getUserList = async (req, res) => {
  let users = await Users.find(req.params.body);
  if (!users) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(users);
};

//authorization

//login
exports.requireUser = (req, res, next) => {
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })(req, res, (error) => {
    if (error) {
      return res.status(401).json({ message: "You need to login first" });
    } else {
      next();
    }
  });
};

//admin
exports.requireAdmin = (req, res, next) => {
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "Auth",
  });
};
