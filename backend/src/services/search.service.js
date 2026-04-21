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
  });
};

const basicSearch = async (searchSring, type) => {
  return await prisma.pet.findMany({
    where: {
      name: {
        contains: searchString,
        mode: "insensitive",
      },
    },
  });
};

const filter = async (tags) => {
  return await prisma.pet.findMany({
    where: {
      OR: [
        {
          breed: {
            contains: tags,
            mode: "insensitive",
          },
        },
        {
          age: {
            contains: tags,
            mode: "insensitive",
          },
        },
        {
          animalType: {
            contains: tags,
            mode: "insensitive",
          },
        },
      ],
    },
  });
};

module.exports = { getSuggestions, basicSearch, filter };
