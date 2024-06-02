import {
  findAllUsers,
  findUserById,
  saveUser,
  updateUser,
  deleteUser,
  findUserByUsername,
} from "../services/userService.js";
import CustomError from "../error/customError.js";

const findAll = async (req, res) => {
  try {
    console.log("Finding all users");
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ code: error.code, message: error.message });
    } else {
      res
        .status(500)
        .json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
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
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ code: error.code, message: error.message });
    } else {
      res
        .status(500)
        .json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  }
};

const findByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    console.log(`Finding user by username: ${username}`);

    if (username) {
      const user = await findUserByUsername(username);
      res.json(user);
    } else {
      res.status(400).json({ message: "No username sent" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ code: error.code, message: error.message });
    } else {
      res
        .status(500)
        .json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  }
};

const save = async (req, res) => {
  try {
    const userData = req.body;

    console.log("Saving user");

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
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ code: error.code, message: error.message });
    } else {
      res
        .status(500)
        .json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  }
};

const update = async (req, res) => {
  try {
    const userData = req.body;

    console.log(userData);

    console.log(`Updating user for userID: ${userData.userId}`);

    // Validate the incoming request payload
    if (
      !userData.userId ||
      !userData.userName ||
      !userData.userEmail ||
      !userData.password ||
      !userData.accountType ||
      !userData.accountStatus
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("3");

    const updatedUser = await updateUser(userData);
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ code: error.code, message: error.message });
    } else {
      res
        .status(500)
        .json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  }
};

const deleteById = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(`Deleting user by userID: ${userId}`);

    if (userId) {
      const response = await deleteUser(userId);
      res.send(response);
    } else {
      res.status(400).json({ message: "No user id sent" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ code: error.code, message: error.message });
    } else {
      res
        .status(500)
        .json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  }
};

export { findAll, findById, findByUsername, save, update, deleteById };
