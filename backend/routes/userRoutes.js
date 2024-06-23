const express = require('express');
const {registerUser, authUser, allUsers} = require("../controllers/userControllers");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// down below are basically controllers
// router.route('/').post(registerUser).get(protect, allUsers);
router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post('/login', authUser);
// router.route('/').get(allUsers);


module.exports = router;    