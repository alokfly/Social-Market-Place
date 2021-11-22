const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Story = require("../models/Story");
var ObjectId = require("mongodb").ObjectID;

module.exports.addPost = async (req, res) => {
  const { userId, title, description, tags } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  try {
    const addPost = await Post.create({
      userId,
      title,
      description,
      tags,
      image: profileImage,
    });
    res.status(200).json({ msg: "Post added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewPost = async (req, res) => {
  try {
    const viewPost = await Post.find({}).populate("userId", "name").exec();
    res.status(200).json({ viewPost });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addComment = async (req, res) => {
  const { userId, postId, comment } = req.body;
  try {
    const addComment = await Comment.create({
      userId,
      postId,
      comment,
      date: new Date(),
    });
    res.status(200).json({ msg: "Comment sucessfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewComment = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.body.postId })
      .populate("userId", "name")
      .exec();
    res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
  }
};

module.exports.likePost = async (req, res) => {
  await Post.findByIdAndUpdate(
    { _id: ObjectId(req.body.postId) },
    {
      $push: { like: req.body.userId },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      console;
      return res.status(422).json(err);
    } else {
      res.json(result);
    }
  });
};
