const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/EventImages");
  },
  filename: function (req, file, cb) {
    cb(null, "event" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addEvent,
  viewEvent,
  viewEventAdmin,
} = require("../controllers/EventController");

router.post("/addEvent", auth, upload.single("myField"), addEvent);
router.get("/viewEvent", auth, viewEvent);
router.get("/viewEventAdmin", viewEventAdmin);

module.exports = router;
