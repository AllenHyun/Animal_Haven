const prisma = require("../config/prisma");

const getPets = async () => {
  return await prisma.pet.findMany({
    include: {
      shelter: true,
    },
  });
};

const getDogBreeds = async () => {
  return await prisma.pet.findMany({
    where: { animalType: "Dog" },
    select: {
      breed: true,
    },
    distinct: ["breed"],
  });
};

const getCatBreeds = async () => {
  return await prisma.pet.findMany({
    where: { animalType: "Cat" },
    select: {
      breed: true,
    },
    distinct: ["breed"],
  });
};

module.exports = { getPets, getDogBreeds, getCatBreeds };
