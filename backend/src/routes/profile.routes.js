const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");

router.get("/", authenticateToken, profileController.getUserById);

module.exports = router;
