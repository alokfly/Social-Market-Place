const { model, Schema } = require("mongoose");

const businessPageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    business_name: {
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
    phone: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    business_category: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("businessPage", businessPageSchema);
