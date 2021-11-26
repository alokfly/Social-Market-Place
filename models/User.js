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
