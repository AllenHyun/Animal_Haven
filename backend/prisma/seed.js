const { PrismaClient } = require("../src/generated/prisma/client");
const animalData = require("./data/animals.json");

const prisma = require("../src/config/prisma");

async function main() {
  console.log("Starting seed...");

  let petsUpserted = 0;
  for (const pet of animalData) {
    await prisma.pet.upsert({
      where: { id: pet.id },
      update: pet,
      create: pet,
    });
    petsUpserted++;
  }
  console.log(`Upserted ${petsUpserted} pets.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
