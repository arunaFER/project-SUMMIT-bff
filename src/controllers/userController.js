import {
  findAllUsers,
  findUserById,
  saveUser,
} from "../services/userService.js";

const findAll = async (req, res) => {
  try {
    console.log("Finding all users");
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(`Finding user by userID: ${userId}`);

    if (userId) {
      const user = await findUserById(userId);
      res.json(user);
    } else {
      res.status(400).json({ message: "No user id sent" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const save = async (req, res) => {
  try {
    const userData = req.body;

    // Validate the incoming request payload
    if (
      !userData.userName ||
      !userData.userEmail ||
      !userData.password ||
      !userData.accountType ||
      !userData.accountStatus
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const savedUser = await saveUser(userData);
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = (req, res) => {
  res.send("update user!");
};

const deleteById = (req, res) => {
  res.send("delete user by Id!");
};

export { findAll, findById, save, update, deleteById };
