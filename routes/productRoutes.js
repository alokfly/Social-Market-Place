const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/ProductImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addProduct,
  viewProduct,
  addReport,
  viewReports,
  viewParticularReport,
} = require("../controllers/ProductController");

router.post("/addProduct", auth, upload.single("myField"), addProduct);
router.get("/viewProduct/:page", auth, viewProduct);
router.post("/addReport", auth, addReport);
router.get("/viewReports", auth, viewReports);
router.get("/viewParticularReport/:id", auth, viewParticularReport);

module.exports = router;
