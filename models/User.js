const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    warning_notification: [
      {
        comments: String,
      },
    ],
    like_notification: [
      {
        comments: String,
        postIdBy: { type: Schema.Types.ObjectId, ref: "user" },
        postId: { type: Schema.Types.ObjectId, ref: "post" },
      },
    ],
    comment_notification: [
      {
        comments: String,
        postIdBy: { type: Schema.Types.ObjectId, ref: "user" },
        postId: { type: Schema.Types.ObjectId, ref: "post" },
      },
    ],
    follow_notification: [
      {
        type: String,
      },
    ],
    groudJoined: [
      {
        type: Schema.Types.ObjectId,
        ref: "group",
      },
    ],
  },
  { timestamps: true }
);
module.exports = model("user", userSchema);
