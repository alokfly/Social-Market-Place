const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const { addBusinessPage } = require("../controllers/BusinessPageController");

router.post("/addBusinessPage", auth, addBusinessPage);

module.exports = router;
