const app = require("express");
const router = app.Router();

const {
  newConversation,
  getConversation,
} = require("../controllers/ConversationController");

router.post("/conversation", newConversation);
router.get("/getConversation/:userId", getConversation);

module.exports = router;
