const Product = require("../models/Product");

module.exports.addProduct = async (req, res) => {
  const productImage = req.file ? req.file.path : null;
  const {
    productName,
    price,
    percentageDonation,
    description,
    category,
    postTo,
    promote,
  } = req.body;

  try {
    const addProduct = await Product.create({
      userId: req.user,
      productName,
      price,
      percentageDonation,
      description,
      category,
      postTo,
      promote,
      image: productImage,
    });
    res.status(201).json({ msg: "Product successfully added", addProduct });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewProduct = async (req, res) => {
  const page = req.params.page;
  const perPage = 3;
  const skip = (page - 1) * perPage;
  try {
    const viewProduct = await Product.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    res.status(200).json(viewProduct);
  } catch (error) {
    console.log(error);
  }
};
