const getPets = async () => {
  return await prisma.pet.findMany();
};
