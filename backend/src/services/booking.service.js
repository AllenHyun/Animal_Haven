const prisma = require("../config/prisma");

const saveBooking = async (name, email, date, shelterId, timeFrame, userid) => {
  return await prisma.$transaction(async (tx) => {
    const slots = await tx.availableTime.findMany({
      where: { shelterId: parseInt(shelterId) },
    });
    const slot = slots.find(
      (s) =>
        s.timeFrame.toString().includes(timeFrame) &&
        (s.isAvailable === true || s.isAvailable === 1),
    );

    if (!slot) {
      throw new Error("El horario seleccionado ya no está disponible.");
    }

    // 3. Bloqueamos el horario usando su ID único (esto no falla nunca)
    await tx.availableTime.update({
      where: { id: slot.id },
      data: { isAvailable: false },
    });

    // 4. Creamos el registro de la reserva
    return await tx.booking.create({
      data: {
        name,
        email,
        timeFrame,
        date: slot.date,
        shelterId: parseInt(shelterId),
        userId: userid ? parseInt(userid) : null,
      },
    });
  });
};

const getTimeFrames = async (id, date) => {
  const shelterId = parseInt(id, 10);

  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  return await prisma.availableTime.findMany({
    where: {
      shelterId: shelterId,
      date: {
        gte: start,
        lte: end,
      },
      isAvailable: true,
    },
  });
};
/** 
const getTimeFrames = async (timeframe) => {
 
  console.log(timeframe.date);
  console.log(timeframe.id);
  if (!timeframe.date) {
    throw new Error("Date is required");
  }
  const parsedDate = new Date(timeframe.date);

// fuerza el mismo "día lógico" que la BD usa
const normalized = new Date(Date.UTC(
  parsedDate.getUTCFullYear(),
  parsedDate.getUTCMonth(),
  parsedDate.getUTCDate(),
  23, 0, 0, 0
));

const c = await prisma.availableTime.findMany({
  where: {
    shelterId: parseInt(timeframe.id, 10),
    isAvailable: true,
    date: normalized
  }
});
  return c;
  
};
*/
const getShelters = async (shelterId) => {
  return await prisma.shelter.findMany({
    select: { id: true, name: true, address: true },
  });
};

module.exports = { saveBooking, getTimeFrames, getShelters };
