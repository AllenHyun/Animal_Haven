const profileService = require("../services/profile.service");

const getUserById = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const user = await profileService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch user information" });
  }
};

module.exports = { getUserById };
