const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    percentageDonation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    postTo: {
      type: String,
      required: true,
    },
    promote: {
      type: String,
    },
    location: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
