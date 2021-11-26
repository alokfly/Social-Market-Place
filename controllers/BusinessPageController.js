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
    const addBusinessPage = BusinessPage.create({
      userId: req.user,
      business_name,
      address,
      email,
      phone,
      website,
      business_category,
      privacy,
    });
    res.status(200).json({ msg: "Business Page added successfully" });
  } catch (error) {
    console.log(error);
  }
};
