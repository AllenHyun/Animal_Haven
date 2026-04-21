const petService = require("../services/pets.service");

const getPets = async (req, res) => {
  try {
    const results = petService.getPets();
    res.status(201).json(results);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch pets" });
  }
};
