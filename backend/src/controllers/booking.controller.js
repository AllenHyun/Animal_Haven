const bookingService = require("../services/booking.service.js");
const getSuggestions = require("./search.controller.js");

const saveBooking = async (req, res) => {
  const { name, email, date, shelterId, timeFrame } = req.body;

  try {
    const userId = req.user.userId;
    const result = await bookingService.saveBooking(
      name,
      email,
      date,
      shelterId,
      timeFrame,
      userId,
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
    console.log("This is the date:", date);
    const times = await bookingService.getTimeFrames(id, date);

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
    res.status(400).json({ error: "Failed to retrieve available shelters" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const bookings = await bookingService.getUserBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch user bookings" });
  }
};

module.exports = { saveBooking, getTimeFrames, getShelters, getUserBookings };
