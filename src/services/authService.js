import axios from "axios";
import bcrypt from "bcrypt";

import { findUserByUsername, saveUser } from "./userService.js";
import handleServiceError from "../error/serviceError.js";
import CustomError from "../error/customError.js";

async function userSignUp(userData) {
  console.log("authService: userSignUp");

  // Check for existing user for username
  const duplicateUser = await findUserByUsername(userData.userName);

  console.log(duplicateUser);

  if (duplicateUser) {
    throw new CustomError(409, "User with username already exists");
  }

  // encrypt password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(userData.password, salt);

  console.log(hashPassword);

  userData.password = hashPassword;

  try {
    const savedUser = await saveUser(userData);
    return savedUser;
  } catch (error) {
    throw new CustomError(500, "Error saving user");
  }
}

export { userSignUp };
