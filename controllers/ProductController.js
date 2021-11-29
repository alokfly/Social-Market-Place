const Product = require("../models/Product");

module.exports.addProduct = async (req, res) => {
  const productImage = req.file ? req.file.filename : null;
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
  try {
    const viewProduct = await Product.find({});
    res.status(200).json(viewProduct);
  } catch (error) {
    console.log(error);
  }
};
