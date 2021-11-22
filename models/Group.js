const { model, Schema } = require("mongoose");
const groupSchema = new Schema(
  {
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
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("group", groupSchema);
