const prisma = require("../config/prisma");

const getPets = async () => {
  return await prisma.pet.findMany({
    include: {
      shelter: true, 
    },
  });
};

module.exports = { getPets };