const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/CategoryImages");
  },
  filename: function (req, file, cb) {
    cb(null, "category" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addCategory,
  viewAllCategory,
  viewPopularCategory,
} = require("../controllers/CategoryController");

router.post("/addCategory", upload.single("myField"), addCategory);
router.get("/viewAllCategory", viewAllCategory);
router.get("/viewPopularCategory", viewPopularCategory);

module.exports = router;
