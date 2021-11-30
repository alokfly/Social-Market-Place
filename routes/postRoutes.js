const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

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

router.post("/addPost", auth, upload.single("myField"), addPost);
router.post("/addComment", auth, addComment);
router.post("/viewComment", auth, viewComment);
router.post("/likePost", auth, likePost);
router.get("/viewPost/:page", auth, viewPost);

module.exports = router;
