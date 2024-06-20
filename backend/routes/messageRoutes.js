const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageControllers');
const router = express.Router();

// down below are basically controllers
router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);


module.exports = router;