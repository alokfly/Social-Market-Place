const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Story = require("../models/Story");
var ObjectId = require("mongodb").ObjectID;
const Notification = require("../models/Notification");
const User = require("../models/User");

module.exports.addPost = async (req, res) => {
  const { title, description, tags, postType, rangeOfPost, location } =
    req.body;
  const profileImage = req.file ? req.file.path : null;
  try {
    const addPost = await Post.create({
      userId: req.user,
      title,
      description,
      tags,
      postType,
      rangeOfPost,
      location,
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

module.exports.hidePost = async (req, res) => {
  const { postId } = req.body;
  await Post.findByIdAndUpdate(
    { _id: ObjectId(postId) },
    {
      $push: { postHiddenFromUser: req.user },
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

module.exports.getAllPosts = async (req, res) => {
  const page = req.params.page;
  const perPage = 3;
  const skip = (page - 1) * perPage;
  try {
    const getAllPosts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postHiddenFromUser",
          foreignField: "_id",
          as: "fromItems",
        },
      },
      {
        $match: {
          $expr: {
            $eq: [{ $size: "$fromItems" }, 0],
          },
        },
      },
    ])
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 })
      .exec();
    return res.status(201).json(getAllPosts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.addComment = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user,
  };
  await Post.findByIdAndUpdate(
    { _id: ObjectId(req.body.postId) },
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .exec(async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(422).json({ error: err });
      } else {
        const commentedUserDetail = await User.findOne({
          _id: ObjectId(req.user),
        });
        const username = commentedUserDetail.name;
        const addComment = {
          comments: `${username} commented on you post ${req.body.text}`,
          postIdBy: req.user._id,
          postId: req.body.postId,
        };
        const getPostDetail = await Post.findOne({
          _id: ObjectId(req.body.postId),
        });
        const userId = getPostDetail.userId;
        const data = await User.findByIdAndUpdate(
          { _id: ObjectId(userId) },
          { $push: { comment_notification: addComment } },
          {
            new: true,
          }
        ).exec();
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
      const commentedUserDetail = await User.findOne({
        _id: ObjectId(req.user),
      });
      const username = commentedUserDetail.name;
      const addComment = {
        comments: `${username} like your post`,
        postIdBy: req.user._id,
        postId: req.body.postId,
      };
      const getPostDetail = await Post.findOne({
        _id: ObjectId(req.body.postId),
      });
      const userId = getPostDetail.userId;
      const data = await User.findByIdAndUpdate(
        { _id: ObjectId(userId) },
        { $push: { like_notification: addComment } },
        {
          new: true,
        }
      ).exec();
      res.json(result);
    }
  });
};

module.exports.fetchNotification = async (req, res) => {
  try {
    const notification = await User.findOne({ _id: ObjectId(req.user._id) })
      .populate("comment_notification.postId", "title image")
      .populate("like_notification.postId", "title image")
      .exec();
    res.status(200).json({ notification });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addNotification = async (req, res) => {
  const { title, description, type, userId } = req.body;
  try {
    const addNoti = await Notification.create({
      title,
      description,
      type,
      userId,
    });
    userId.forEach(async (item) => {
      const addComment = {
        comments: `${title} : ${description} `,
      };
      const data = await User.findByIdAndUpdate(
        { _id: ObjectId(item) },
        { $push: { warning_notification: addComment } },
        {
          new: true,
        }
      ).exec();
    });
    return res.status(200).json({ msg: "notification successfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getNotification = async (req, res) => {
  try {
    const get = await Notification.find({});
    return res.status(200).json({ get });
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchPosts = async (req, res) => {
  try {
    var regex = new RegExp(req.params.name, "i");
    const searchPost = await Post.find({ title: regex });
    return res.status(200).json(searchPost);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.feedFilter = async (req, res) => {
  try {
    var regex = new RegExp(req.params.type, "i");
    const filterPost = await Post.find({ postType: regex });
    return res.status(200).json(filterPost);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.countComments = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
