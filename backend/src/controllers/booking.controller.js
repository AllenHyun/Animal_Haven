const bookingService = require("../services/booking.service.js");
const getSuggestions = require("./search.controller.js");

const saveBooking = async (req, res) => {
  const { name, email, date, shelterId, timeFrame, userid } = req.body;

  try {
    const result = await bookingService.saveBooking(
      name,
      email,
      date,
      shelterId,
      timeFrame,
      userid,
    );

    res.status(201).json(result);
  } catch (error) {
    console.error("ERROR EN BACKEND:", error);
    res.status(400).json({
      error: "Failed to save booking",
      details: error.message,
    });
  }
};
const getTimeFrames = async (req, res) => {
  try {
    const { id, date } = req.query;

    const times = await bookingService.getTimeFrames({ id, date });

    res.status(200).json(times);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to retrieve available time frames" });
  }
};

const getShelters = async (req, res) => {
  try {
    const shelters = await bookingService.getShelters();
    res.status(200).json(shelters);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to retrieve available time frames" });
  }
};

module.exports = { saveBooking, getTimeFrames, getShelters };
