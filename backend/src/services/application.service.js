const prisma = require("../config/prisma");

const getUserApplications = async (userId) => {
  return await prisma.application.findMany({
    where: { userId: userId },
    include: {
      pet: {
        select: { name: true },
      },
      location: {
        select: { name: true },
      },
    },
  });
};

const saveApplication = async (
  userId,
  firstName,
  lastName,
  address,
  notes,
  petId,
  type,
) => {
  return await prisma.application.create({
    data: {
      userId,
      firstName,
      lastName,
      address,
      notes,
      petId,
      type,
    },
  });
};

module.exports = { getUserApplications, saveApplication };
