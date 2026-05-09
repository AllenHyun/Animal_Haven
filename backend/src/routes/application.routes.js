const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const applicationController = require("../controllers/application.controller");

router.get("/", authenticateToken, applicationController.getUserApplications);

module.exports = router;
