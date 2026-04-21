const express = require("express");
const router = express.Router();
const petController = require("../controllers/pets.controller");

router.get("/all", petController.getPets);

module.exports = router;
