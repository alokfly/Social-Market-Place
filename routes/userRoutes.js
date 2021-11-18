const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/UserImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });
const {
  register,
  registerValiations,
  login,
  loginValiations,
  emailSend,
  changePassword,
} = require("../controllers/UserController");

router.post(
  "/register",
  upload.single("myField"),
  registerValiations,
  register
);
router.post("/login", loginValiations, login);
router.post("/resetPassword/emailSend", emailSend);
router.post("/changePassword", changePassword);

module.exports = router;
