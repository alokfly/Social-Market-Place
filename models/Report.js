const { model, Schema } = require("mongoose");

const reportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    pageId: {
      type: Schema.Types.ObjectId,
      ref: "businessPage",
    },
    type: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("report", reportSchema);
