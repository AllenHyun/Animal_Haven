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

const updateDescription = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const description = req.body.userDescription;
    console.log("Description:", description);

    const response = await profileService.updateDescription(
      userId,
      description,
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to update user information" });
  }
};

module.exports = { getUserById, updateDescription };
