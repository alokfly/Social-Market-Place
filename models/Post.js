const { model, Schema } = require("mongoose");
const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rangeOfPost: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        text: String,
        postedBy: { type: Schema.Types.ObjectId, ref: "user" },
      },
    ],
    postHiddenFromUser: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = model("post", postSchema);
