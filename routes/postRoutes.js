const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/PostImages");
  },
  filename: function (req, file, cb) {
    cb(null, "post" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addPost,
  addComment,
  viewComment,
  likePost,
  viewPost,
  fetchNotification,
  addNotification,
  getNotification,
  hidePost,
  getAllPosts,
  searchPosts,
  feedFilter,
} = require("../controllers/PostController");

router.post("/addPost", auth, upload.single("myField"), addPost);
router.post("/addComment", auth, addComment);
router.post("/viewComment", auth, viewComment);
router.post("/hidePost", auth, hidePost);
router.get("/getAllPosts/:page", auth, getAllPosts);
router.post("/likePost", auth, likePost);
router.get("/viewPost/:page", auth, viewPost);
router.get("/fetchNotification", auth, fetchNotification);
router.post("/addNotification", auth, addNotification);
router.get("/getNotification", auth, getNotification);
router.get("/searchPosts/:name", auth, searchPosts);
router.get("/feedFilter/:type", auth, feedFilter);

module.exports = router;
