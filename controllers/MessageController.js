const Message = require("../models/Message");

module.exports.newMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
