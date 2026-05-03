const { emit } = require("node:cluster");
const prisma = require("../config/prisma");

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      postcode: true,
      description: true,
    },
  });
};

module.exports = { getUserById };
