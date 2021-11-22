const { model, Schema } = require("mongoose");
const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = model("conversation", conversationSchema);
