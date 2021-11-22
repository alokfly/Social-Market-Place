const Conversation = require("../models/Conversation");

module.exports.newConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const sendConversation = await newConversation.save();
    res.status(200).json(sendConversation);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
