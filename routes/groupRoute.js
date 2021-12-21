const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/GroupImage");
  },
  filename: function (req, file, cb) {
    cb(null, "product" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addGroup,
  viewAllGroup,
  joinGroup,
  viewJoinedGroup,
  viewPouplarGroups,
  viewGroupNearMe,
  searchGroups,
  viewUsersGroup,
  home,
} = require("../controllers/GroupController");

router.post("/addGroup", auth, upload.single("myField"), addGroup);
router.get("/viewAllGroup", auth, viewAllGroup);
router.post("/joinGroup", auth, joinGroup);
router.get("/viewPouplarGroups", auth, viewPouplarGroups);
router.get("/viewJoinedGroup", auth, viewJoinedGroup);
router.post("/viewGroupNearMe", auth, viewGroupNearMe);
router.get("/searchGroups/:name", auth, searchGroups);
router.get("/viewUsersGroup", auth, viewUsersGroup);
router.get("/home", auth, home);

module.exports = router;
