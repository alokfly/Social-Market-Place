const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Story = require("../models/Story");
var ObjectId = require("mongodb").ObjectID;
const Notification = require("../models/Notification");
const User = require("../models/User");

module.exports.addPost = async (req, res) => {
  const { title, description, tags } = req.body;
  const profileImage = req.file ? req.file.path : null;
  console.log(req.user);
  try {
    const addPost = await Post.create({
      userId: req.user,
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
  const page = req.params.page;
  const perPage = 3;
  const skip = (page - 1) * perPage;
  try {
    const viewPost = await Post.find({})
      .populate("userId", "name")
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 })
      .exec();
    res.status(200).json({ viewPost });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addComment = async (req, res) => {
  const { text, postId } = req.body;
  const comment = {
    text: text,
    postedBy: req.user,
  };
  await Post.findByIdAndUpdate(
    { _id: ObjectId(postId) },
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        console.log(result);
        res.json(result);
      }
    });
};

module.exports.viewComment = async (req, res) => {
  try {
    const comment = await Post.findOne({ _id: req.body.postId })
      .populate("comments.postedBy", "_id name")
      .exec();
    res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
  }
};

module.exports.likePost = async (req, res) => {
  const userDetail = await User.findOne({ _id: ObjectId(req.user) });
  await Post.findByIdAndUpdate(
    { _id: ObjectId(req.body.postId) },
    {
      $push: { like: req.user },
    },
    {
      new: true,
    }
  ).exec(async (err, result) => {
    if (err) {
      console;
      return res.status(422).json(err);
    } else {
      const postDetail = await Post.findOne({ _id: ObjectId(req.body.postId) });
      const addCommentNotification = await Notification.create({
        notificationUserId: postDetail.userId,
        notificationSenderId: req.user,
        text: `${userDetail.name} liked your post`,
      });
      res.json(result);
    }
  });
};

module.exports.fetchNotification = async (req, res) => {
  try {
    const fetchNoti = await Notification.find({ notificationUserId: req.user });
    res.status(200).json(fetchNoti);
  } catch (error) {
    console.log(error);
  }
};

module.exports.countComments = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
