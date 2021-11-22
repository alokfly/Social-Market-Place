const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/StoryImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const { addStory, viewStories } = require("../controllers/StoryController");

router.post("/addStory", upload.single("myField"), addStory);
router.get("/viewStories", viewStories);

module.exports = router;
