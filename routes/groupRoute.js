const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

const {
  addGroup,
  viewAllGroup,
  joinGroup,
  viewJoinedGroup,
  viewPouplarGroups,
  viewGroupNearMe,
  searchGroups,
  home,
} = require("../controllers/GroupController");

router.post("/addGroup", auth, addGroup);
router.get("/viewAllGroup", auth, viewAllGroup);
router.post("/joinGroup", auth, joinGroup);
router.get("/viewPouplarGroups", auth, viewPouplarGroups);
router.get("/viewJoinedGroup", auth, viewJoinedGroup);
router.post("/viewGroupNearMe", auth, viewGroupNearMe);
router.get("/searchGroups", auth, searchGroups);
router.get("/home", auth, home);

module.exports = router;
