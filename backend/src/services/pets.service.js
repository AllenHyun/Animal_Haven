const prisma = require("../config/prisma");

const getPets = async () => {
  return await prisma.pet.findMany();
};

module.exports = { getPets };
