const Group = require("../models/Group");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

module.exports.addGroup = async (req, res) => {
  const groupImage = req.file ? req.file.path : null;
  const { group_name, boundary, privacy, location } = req.body;
  try {
    const addGroup = await Group.create({
      userId: req.user,
      group_name,
      boundary,
      privacy,
      location,
      image: groupImage,
    });
    res.status(200).json({ msg: "Group added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewAllGroup = async (req, res) => {
  try {
    const viewAllGroup = await Group.find({});
    return res.status(200).json(viewAllGroup);
  } catch (error) {
    console.log(error);
  }
};

module.exports.joinGroup = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: ObjectId(req.user) },
    {
      $push: { groudJoined: req.body.groupId },
    },
    {
      new: true,
    }
  ).exec(async (err, result) => {
    if (err) {
      return res.status(422).json(err);
    } else {
      const userJoinedGroup = await Group.findByIdAndUpdate(
        {
          _id: ObjectId(req.body.groupId),
        },
        {
          $push: { userJoinedGroup: req.user },
        },
        {
          new: true,
        }
      );
      res.json({ msg: "group joined successfully", result });
    }
  });
};

module.exports.viewJoinedGroup = async (req, res) => {
  const viewUserJoinedGroup = await User.findOne({
    _id: ObjectId(req.user),
  })
    .populate("groudJoined")
    .exec();
  res.status(200).json(viewUserJoinedGroup);
};

module.exports.viewPouplarGroups = async (req, res) => {
  try {
    const viewGroups = await Group.aggregate([
      { $unwind: "$userJoinedGroup" },
      {
        $group: {
          _id: "$_id",
          group_name: { $push: "$group_name" },
          size: { $sum: 1 },
        },
      },
      { $sort: { size: -1 } },
    ]);
    return res.status(200).json(viewGroups);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewGroupNearMe = async (req, res) => {
  const { long, lat } = req.body;
  try {
    const options = {
      location: {
        $geoWithin: {
          $centerSphere: [[long, lat], 15 / 3963.2],
        },
      },
    };
    const findGroup = await Group.find(options);
    return res.status(200).json(findGroup);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.searchGroups = async (req, res) => {
  try {
    var regex = new RegExp(req.params.name, "i");
    const searchGroup = await Group.find({ group_name: regex });
    return res.status(200).json(searchGroup);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewUsersGroup = async (req, res) => {
  try {
    const viewUsersGroup = await Group.find({ userId: req.user });
    return res.status(200).json(viewUsersGroup);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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
