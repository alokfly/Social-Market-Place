const Event = require("../models/Event");

module.exports.addEvent = async (req, res) => {
  const { title, event_date, event_time } = req.body;
  const eventImage = req.file ? req.file.filename : null;
  try {
    const addEvent = await Event.create({
      userId: req.user,
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

module.exports.viewEvent = async (req, res) => {
  try {
    const viewEvent = await Event.find({});
    return res.status(200).json(viewEvent);
  } catch (error) {
    console.log(error);
  }
};
