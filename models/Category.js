const { model, Schema } = require("mongoose");
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    popular_category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("category", categorySchema);
