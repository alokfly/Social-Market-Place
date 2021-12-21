const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const {
  addBusinessPage,
  viewBusinessPage,
  viewUsersBusiness,
} = require("../controllers/BusinessPageController");

router.post("/addBusinessPage", auth, addBusinessPage);
router.get("/viewBusinessPage", auth, viewBusinessPage);
router.get("/viewUsersBusiness", auth, viewUsersBusiness);

module.exports = router;
