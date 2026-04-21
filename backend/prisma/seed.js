const { PrismaClient } = require("../src/generated/prisma/client");
const animalData = require("./data/animals.json");

const prisma = require("../src/config/prisma");

async function main() {
  console.log("Starting seed...");

  await prisma.pet.createMany({
    data: animalData,
    skipDuplicates: true,
  });
  console.log(`Seeded ${animalData.length} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
