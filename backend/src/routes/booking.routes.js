const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

router.post("/save", bookingController.saveBooking);
router.get("/getTimeFrames", bookingController.getTimeFrames);

module.exports = router;
