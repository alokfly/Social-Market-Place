const { model, Schema } = require("mongoose");
const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = model("message", messageSchema);
