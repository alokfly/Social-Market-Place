const Event = require("../models/Event");

module.exports.addEvent = async (req, res) => {
  const { title, event_date, event_time } = req.body;
  const eventImage = req.file ? req.file.path : null;
  try {
    const addEvent = await Event.create({
      title,
      event_date,
      event_time,
      image: eventImage,
    });
    res.status(200).json({ msg: "Event added successfully" });
  } catch (error) {
    console.log(error);
  }
};
