const BusinessPage = require("../models/BusinessPage");

module.exports.addBusinessPage = async (req, res) => {
  const {
    business_name,
    address,
    email,
    phone,
    website,
    business_category,
    privacy,
  } = req.body;
  try {
    const addBusinessPage = await BusinessPage.create({
      userId: req.user,
      business_name,
      address,
      email,
      phone,
      website,
      business_category,
      privacy,
    });
    res
      .status(200)
      .json({ msg: "Business Page added successfully", addBusinessPage });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewBusinessPage = async (req, res) => {
  try {
    const viewBusinessPage = await BusinessPage.find({});
    res.status(200).json(viewBusinessPage);
  } catch (error) {
    console.log(error);
  }
};
