const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");

const { addGroup, home } = require("../controllers/GroupController");

router.post("/addGroup", auth, addGroup);
router.get("/home", auth, home);

module.exports = router;
