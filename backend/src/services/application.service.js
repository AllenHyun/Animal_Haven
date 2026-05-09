const prisma = require("../config/prisma");

const getUserApplications = async (userId) => {
  return await prisma.application.findMany({
    where: { userId: userId },
  });
};

module.exports = { getUserApplications };
