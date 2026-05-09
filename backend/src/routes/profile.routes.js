const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");

router.get("/", authenticateToken, profileController.getUserById);
router.post("/edit", authenticateToken, profileController.updateDescription);

module.exports = router;
