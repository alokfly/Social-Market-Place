const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const {
  addBusinessPage,
  viewBusinessPage,
} = require("../controllers/BusinessPageController");

router.post("/addBusinessPage", auth, addBusinessPage);
router.get("/viewBusinessPage", auth, viewBusinessPage);

module.exports = router;
