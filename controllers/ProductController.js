const Product = require("../models/Product");
const Report = require("../models/Report");
const BusinessPage = require("../models/BusinessPage");
var ObjectId = require("mongodb").ObjectID;

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
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewProductDetail = async (req, res) => {
  try {
    const viewProductById = await Product.findOne({
      _id: ObjectId(req.params.id),
    });
    return res.status(200).json(viewProductById);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewProductByCategory = async (req, res) => {
  try {
    const viewProductByCategory = await Product.find({
      category: req.params.category,
    });
    return res.status(200).json(viewProductByCategory);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.viewJustListedProduct = async (req, res) => {
  try {
    const viewProduct = await Product.find({}).limit(5).sort({ _id: -1 });
    return res.status(200).json(viewProduct);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.addReport = async (req, res) => {
  const { productId, pageId, type, time, description } = req.body;
  try {
    if (productId != null) {
      const getProductDetail = await Product.findOne({
        _id: ObjectId(req.body.productId),
      });
      const userId = getProductDetail.userId;
      const addReport = await Report.create({
        productId,
        userId,
        type,
        time,
        description,
      });
      return res.status(200).json({ msg: "Success" });
    } else {
      const getProductDetail = await BusinessPage.findOne({
        _id: ObjectId(req.body.pageId),
      });
      const userId = getProductDetail.userId;
      const addReport = await Report.create({
        pageId,
        userId,
        type,
        time,
        description,
      });
      return res.status(200).json({ msg: "Success" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewReports = async (req, res) => {
  try {
    const report = await Report.find()
      .populate("productId", "productName")
      .populate("pageId", "business_name")
      .populate("userId", "name")
      .exec();
    res.status(200).json({ report });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewParticularReport = async (req, res) => {
  try {
    const viewReport = await Report.findOne({
      _id: ObjectId(req.params.id),
    });
    return res.status(200).json(viewReport);
  } catch (error) {
    console.log(error);
  }
};
