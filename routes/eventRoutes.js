const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/EventImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const { addEvent } = require("../controllers/EventController");

router.post("/addEvent", upload.single("myField"), addEvent);

module.exports = router;
