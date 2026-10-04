const { Router } = require("express");
const { verifyAuth } = require("../utils/auth");
const { sendMessage, getConversations, getMessages, createChannel, selectChannel } = require("../controllers/chat-controller");

const router = Router();

// router.route("/send").post(verifyAuth, sendMessage);

// router.route('/create_channel').post(verifyAuth, createChannel)

router.route('/select').post(verifyAuth, selectChannel)

router.route("/getConversations").get(verifyAuth, getConversations);

// router.route('/getMessages/:id').get(verifyAuth, getMessages)

module.exports = router;
