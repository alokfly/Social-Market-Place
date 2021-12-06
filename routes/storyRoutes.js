const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/StoryImages");
  },
  filename: function (req, file, cb) {
    cb(null, "story" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const { addStory, viewStories } = require("../controllers/StoryController");

router.post("/addStory", auth, upload.single("myField"), addStory);
router.get("/viewStories", auth, viewStories);

module.exports = router;
