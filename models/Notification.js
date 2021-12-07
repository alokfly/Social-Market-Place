const { model, Schema } = require("mongoose");
const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = model("notification", notificationSchema);
