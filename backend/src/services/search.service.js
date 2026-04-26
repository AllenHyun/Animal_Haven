const prisma = require("../config/prisma");

const getSuggestions = async (searchString, type) => {
  return await prisma.pet.findMany({
    where: {
      name: {
        contains: searchString,
        mode: "insensitive",
      },
    },
    take: 5,
    select: {
      id: true,
      name: true,
    },
      include: {
      shelter: true, 
    },
  });
};

const basicSearch = async (searchSring, type) => {
  return await prisma.pet.findMany({
    where: {
      name: {
        contains: searchString,
        mode: "insensitive",
      },
      include: {
      shelter: true, 
    },
    },
  });
};

const filter = async (filters) => {
  return await prisma.pet.findMany({
    where: filters,
      include: {
      shelter: true, 
    },
  });
};

module.exports = { getSuggestions, basicSearch, filter };
