const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/PostImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addPost,
  addComment,
  viewComment,
  likePost,
  viewPost,
} = require("../controllers/PostController");

router.post("/addPost", upload.single("myField"), addPost);
router.post("/addComment", addComment);
router.post("/viewComment", viewComment);
router.post("/likePost", likePost);
router.get("/viewPost", viewPost);

module.exports = router;
