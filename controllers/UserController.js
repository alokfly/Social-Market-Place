const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const Otp = require("../models/Otp");
var ObjectId = require("mongodb").ObjectID;

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "7d",
  });
};
module.exports.registerValiations = [
  body("name").not().isEmpty().trim().withMessage("Name is required"),
  body("nickname").not().isEmpty().trim().withMessage("Nickname is required"),
  body("address").not().isEmpty().trim().withMessage("Address is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];
module.exports.register = async (req, res) => {
  const profileImage = req.file ? req.file.filename : null;
  const { name, nickname, email, password, address, mobile } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        name,
        nickname,
        email,
        password: hash,
        address,
        mobile,
        image: profileImage,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ msg: "Your account has been created", token, email });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
module.exports.loginValiations = [
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ msg: "You have login successfully", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Password is not correct" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.emailSend = async (req, res) => {
  const { email } = req.body;
  if (email === "") {
    res.status(500).json({ msg: "Email is required" });
  } else {
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        let otpData = new Otp({
          email,
          code: Math.floor(100000 + Math.random() * 900000),
          expireIn: new Date().getTime() + 300 * 1000,
        });

        let optResponse = await otpData.save();
        mailer(email, otpData.code);
        return res.status(200).json({ msg: "OTP sended to your mail" });
      } else {
        return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
    }
  }
};

module.exports.changePassword = async (req, res) => {
  let data = await Otp.find({ email: req.body.mail, code: req.body.code });
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      return res.status(400).json({ errors: [{ msg: "Token expire" }] });
    } else {
      let user = await User.findOne({ email: req.body.email });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      user.password = hash;
      user.save();
      return res.status(200).json({ msg: "Password changes successfully" });
    }
  } else {
    return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
  }
};

const mailer = (email, otp) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "arijithajra62@gmail.com",
      pass: "gdruocofmzahwsdn",
    },
  });
  var mailOptions = {
    from: "arijithajra62@gmail.com",
    to: email,
    subject: "OTP mail",
    text: otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.viewAllUser = async (req, res) => {
  try {
    const viewAllUser = await User.find({});
    return res.status(200).json(viewAllUser);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewParticularUser = async (req, res) => {
  try {
    const view = await User.findOne({ _id: req.params.id });
    return res.status(200).json(view);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewLoggedInUser = async (req, res) => {
  try {
    const viewLoggedInUser = await User.findOne({ _id: req.user._id });
    return res.status(200).json(viewLoggedInUser);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.editUser = async (req, res) => {
  const { nickname, bio, mobile, address, email } = req.body;
  const userImage = req.file ? req.file.path : null;
  try {
    const editUser = await User.findByIdAndUpdate(
      { _id: ObjectId(req.user._id) },
      {
        nickname,
        bio,
        mobile,
        address,
        email,
        image: userImage,
      }
    );
    return res.status(200).json({ msg: "user successfully edited", editUser });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
