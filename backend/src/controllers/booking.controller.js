const bookingService = require("../services/booking.service");

const saveBooking = async (req, res) => {
  try {
    const booking = await bookingService.saveBooking();
    res.status(200).json(booking);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res
      .status(400)
      .json({ error: "Failed to save booking, please try again later" });
  }
};

const getTimeFrames = async (req, res) => {
  try {
    const shelterId = req.query.shelter;
    const times = await bookingService.getTimeFrames(shelterId);
    res.status(200).json(times);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to retrieve available time frames" });
  }
};

module.exports = { saveBooking, getTimeFrames };
