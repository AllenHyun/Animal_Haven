const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const bookingController = require("../controllers/booking.controller");

router.post("/save", authenticateToken, bookingController.saveBooking);
router.get("/getTimeFrames", bookingController.getTimeFrames);
router.get("/getShelters", bookingController.getShelters);
router.get("/", authenticateToken, bookingController.getUserBookings);

module.exports = router;
