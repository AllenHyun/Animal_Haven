const petService = require("../services/pets.service");

const getPets = async (req, res) => {
  try {
    const results = await petService.getPets();
    res.status(200).json(results);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch pets" });
  }
};

const getDogBreeds = async (req, res) => {
  try {
    const results = await petService.getDogBreeds();
    res.status(200).json(results);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch dog breeds" });
  }
};

const getCatBreeds = async (req, res) => {
  try {
    const results = await petService.getCatBreeds();
    res.status(200).json(results);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch cat breeds" });
  }
};

module.exports = { getPets, getDogBreeds, getCatBreeds };
