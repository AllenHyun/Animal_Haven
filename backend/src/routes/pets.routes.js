const express = require("express");
const router = express.Router();
const petController = require("../controllers/pets.controller");

router.get("/all", searchController.getSuggestions);

module.exports = router;
