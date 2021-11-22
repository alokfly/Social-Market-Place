const app = require("express");
const router = app.Router();

const { newMessage, getMessage } = require("../controllers/MessageController");

router.post("/newMessage", newMessage);
router.get("/getMessage/:conversationId", getMessage);

module.exports = router;
