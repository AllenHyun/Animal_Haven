const prisma = require("../config/prisma");

const saveBooking = async (name, email, date, shelterId, timeFrame) => {
  prisma.availableTime.update({
    where: { AND: [{ shelterId: shelterId, timeFrame: timeFrame }] },
    data: { isAvailable: false },
  });

  // TODO: Could add the logged-in user so that they can see their bookings

  return await prisma.booking.create({
    data: {
      name,
      email,
      date,
      shelterId,
      timeFrame,
    },
  });
};

const getTimeFrames = async (shelterId) => {
  return await prisma.availableTime.findMany({
    where: {
      AND: [{ shelterId: shelterId, isAvailable: true }],
    },
  });
};

const getShelters = async (shelterId) => {
  return await prisma.shelter.findMany({
    select: { id: true, name: true, address: true },
  });
};

module.exports = { saveBooking, getTimeFrames, getShelters };
