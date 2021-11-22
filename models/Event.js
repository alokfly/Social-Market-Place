const { model, Schema } = require("mongoose");
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    event_date: {
      type: String,
      required: true,
    },
    event_time: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("event", eventSchema);
