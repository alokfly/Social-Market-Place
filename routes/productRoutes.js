const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/ProductImages");
  },
  filename: function (req, file, cb) {
    cb(null, "product" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addProduct,
  viewProduct,
  addReport,
  viewReports,
  viewParticularReport,
  viewJustListedProduct,
  viewProductDetail,
  viewProductByCategory,
} = require("../controllers/ProductController");

router.post("/addProduct", auth, upload.single("myField"), addProduct);
router.get("/viewProduct/:page", auth, viewProduct);
router.get("/viewProductDetail/:id", auth, viewProductDetail);
router.get("/viewProductByCategory/:category", auth, viewProductByCategory);

router.post("/addReport", auth, addReport);
router.get("/viewReports", auth, viewReports);
router.get("/viewJustListedProduct", auth, viewJustListedProduct);
router.get("/viewParticularReport/:id", auth, viewParticularReport);

module.exports = router;
