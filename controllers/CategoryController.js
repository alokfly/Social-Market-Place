const Category = require("../models/Category");

module.exports.addCategory = async (req, res) => {
  const categoryImage = req.file ? req.file.path : null;
  const { name, popular_category } = req.body;
  try {
    const addCategory = await Category.create({
      name,
      popular_category,
      image: categoryImage,
    });
    res.status(200).json({ msg: "Category successfully created" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewAllCategory = async (req, res) => {
  try {
    const viewAllCategory = await Category.find({});
    res.status(200).json(viewAllCategory);
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewPopularCategory = async (req, res) => {
  try {
    const viewPopularCategory = await Category.find({
      popular_category: "yes",
    });
    res.status(200).json(viewPopularCategory);
  } catch (error) {
    console.log(error);
  }
};
