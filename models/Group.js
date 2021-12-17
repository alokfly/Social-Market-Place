const { model, Schema } = require("mongoose");
const groupSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    group_name: {
      type: String,
      required: true,
    },
    boundary: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      required: true,
    },
    userJoinedGroup: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("group", groupSchema);
