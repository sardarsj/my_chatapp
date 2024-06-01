const express = require('express');
const {registerUser} = require("../controllers/userControllers");
const router = express.Router();

// down below are basically controllers
router.route('/').post(registerUser)
router.post('/login', authUser)

module.exports = router;