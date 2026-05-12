const applicationService = require("../services/application.service");

const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const applications = await applicationService.getUserApplications(userId);
    res.status(200).json(applications);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to fetch user applications" });
  }
};

const saveApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, address, notes, petId, type } = req.body;

    if (!userId)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const application = await applicationService.saveApplication(
      userId,
      firstName,
      lastName,
      address,
      notes,
      petId,
      type.toUpperCase(),
    );
    res.status(200).json(application);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    res.status(400).json({ error: "Failed to save application" });
  }
};

module.exports = { getUserApplications, saveApplication };
