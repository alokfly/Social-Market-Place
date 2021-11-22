const app = require("express");
const router = app.Router();

const { addGroup } = require("../controllers/GroupController");

router.post("/addGroup", addGroup);

module.exports = router;
