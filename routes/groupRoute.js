const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

const {
  addGroup,
  viewAllGroup,
  joinGroup,
  viewJoinedGroup,
  home,
} = require("../controllers/GroupController");

router.post("/addGroup", auth, addGroup);
router.post("/viewAllGroup", auth, viewAllGroup);
router.post("/joinGroup", auth, joinGroup);
router.get("/viewJoinedGroup", auth, viewJoinedGroup);
router.get("/home", auth, home);

module.exports = router;
