const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const applicationController = require("../controllers/application.controller");

router.get("/", authenticateToken, applicationController.getUserApplications);
router.post("/save", authenticateToken, applicationController.saveApplication);

module.exports = router;
