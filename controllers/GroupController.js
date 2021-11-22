const Group = require("../models/Group");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.addGroup = async (req, res) => {
  const { group_name, boundary, privacy } = req.body;
  try {
    const addGroup = await Group.create({
      userId: req.user,
      group_name,
      boundary,
      privacy,
    });
    res.status(200).json({ msg: "Group added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.home = async (req, res) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split("Bearer ")[1];
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    console.log(decode);
  } catch (error) {
    return res.status(401).json({ errors: [{ msg: error.message }] });
  }
  res.status(200).json("home");
};
