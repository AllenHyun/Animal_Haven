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
      applications: {
        select: {
          type: true,
          pet: {
            include: {
              shelter: { select: { name: true } },
            },
          },
        },
      },
    },
  });
};

const updateDescription = async (id, description) => {
  return await prisma.user.update({
    where: { id: id },
    data: { description: description },
  });
};

module.exports = { getUserById, updateDescription };
