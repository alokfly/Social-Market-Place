const Group = require("../models/Group");

module.exports.addGroup = async (req, res) => {
  const { group_name, boundary, privacy } = req.body;
  try {
    const addGroup = await Group.create({
      group_name,
      boundary,
      privacy,
    });
    res.status(200).json({ msg: "Group added successfully" });
  } catch (error) {
    console.log(error);
  }
};
