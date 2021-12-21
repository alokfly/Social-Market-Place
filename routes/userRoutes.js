const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/UserImages");
  },
  filename: function (req, file, cb) {
    cb(null, "user_" + Date.now() + path.extname(file.originalname));
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
  viewAllUser,
  viewParticularUser,
  viewLoggedInUser,
  editUser,
  viewUserNearMe,
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
router.get("/viewAllUser", auth, viewAllUser);
router.get("/viewParticularUser/:id", auth, viewParticularUser);
router.get("/viewLoggedInUser", auth, viewLoggedInUser);
router.patch("/editUser", upload.single("myField"), auth, editUser);
router.post("/viewUserNearMe", auth, viewUserNearMe);
module.exports = router;
