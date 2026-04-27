const { PrismaClient } = require("../src/generated/prisma/client");

const prisma = require("../src/config/prisma");

const NAME_POOL = {
  dog: [
    "Max",
    "Bella",
    "Charlie",
    "Luna",
    "Rocky",
    "Daisy",
    "Cooper",
    "Lola",
    "Bailey",
    "Molly",
    "Buster",
    "Sadie",
    "Bruno",
    "Coco",
    "Zeus",
  ],
  cat: [
    "Oliver",
    "Luna",
    "Simba",
    "Chloe",
    "Milo",
    "Nala",
    "Leo",
    "Mia",
    "Jack",
    "Lily",
    "Loki",
    "Sophie",
    "Tigger",
    "Cleo",
    "Whiskers",
  ],
};

const getRandomName = (type) => {
  const names = NAME_POOL[type];
  return names[Math.floor(Math.random() * names.length)];
};

const API_KEYS = {
  dog: "live_DPtTBmQ6F5CfKoYiagIrvsd9GmMVurooyg7ZthNqEHpLIopRqTDciEpf9IKrQCXx",
  cat: "live_v24hpe1hlMbyeQt6mGVpaPP6FkXqnEXyJyBRFiuJzAB59KqkhoqEYj4gpC5zlxFv",
};

const fetchPets = async (type) => {
  const url =
    type === "dog"
      ? "https://api.thedogapi.com/v1/images/search?has_breeds=true&limit=50"
      : "https://api.thecatapi.com/v1/images/search?has_breeds=true&limit=50";

  const res = await fetch(url, {
    headers: { "x-api-key": API_KEYS[type] },
  });
  return await res.json();
};

const getAgeInt = (type) =>
  type === "dog"
    ? Math.floor(Math.random() * 14) + 1
    : Math.floor(Math.random() * 16) + 1;
const getRandomGender = () => (Math.random() > 0.5 ? "Male" : "Female");
const getDescription = (name, breed, type) => {
  const base =
    type === "dog"
      ? "a friendly, playful, and loyal dog."
      : "a curious, independent, and affectionate cat.";
  return `${name} (${breed}) is ${base} Looking for a loving home.`;
};

async function main() {
  console.log("Iniciando el proceso de sembrado (Seed)...");

  try {
    const shelters = await prisma.shelter.findMany();

    if (shelters.length === 0) {
      console.error(
        "Error: No se encontraron refugios (shelters) en la base de datos. Crea algunos primero.",
      );
      process.exit(1);
    }

    const getRandomShelterId = () =>
      shelters[Math.floor(Math.random() * shelters.length)].id;

    console.log("Conectando con las APIs de animales...");
    const [dogs, cats] = await Promise.all([
      fetchPets("dog"),
      fetchPets("cat"),
    ]);

    const normalizePet = (pet, type) => {
      const breedData = pet.breeds?.[0];
      const breedName = breedData?.name || "Mixed Breed";
      const petName = getRandomName(type);

      return {
        name: petName,
        breed: breedName,
        age: getAgeInt(type),
        gender: getRandomGender(),
        animalType: type === "dog" ? "Dog" : "Cat",
        profileImg: pet.url,
        description: getDescription(petName, breedName, type),
        shelterId: getRandomShelterId(),
      };
    };

    const allPetsRaw = [
      ...dogs.map((p) => normalizePet(p, "dog")),
      ...cats.map((p) => normalizePet(p, "cat")),
    ];

    console.log(
      `Insertando ${allPetsRaw.length} mascotas en la base de datos...`,
    );

    const created = await prisma.pet.createMany({
      data: allPetsRaw,
      skipDuplicates: true,
    });

    console.log(`Se han creado ${created.count} nuevas mascotas.`);
  } catch (error) {
    console.error("Error durante el seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
