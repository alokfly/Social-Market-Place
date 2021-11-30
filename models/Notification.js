const { model, Schema } = require("mongoose");
const notificationSchema = new Schema(
  {
    notificationUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    notificationSenderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("notification", notificationSchema);
