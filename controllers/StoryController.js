const Story = require("../models/Story");

module.exports.addStory = async (req, res) => {
  const { userId } = req.body;
  const storyImage = req.file ? req.file.filename : null;
  try {
    const addStory = await Story.create({
      userId,
      image: storyImage,
    });
    res.status(200).json({ msg: "Story added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewStories = async (req, res) => {
  try {
    const viewStories = await Story.find({});
    res.status(200).json(viewStories);
  } catch (error) {
    console.log(error);
  }
};
