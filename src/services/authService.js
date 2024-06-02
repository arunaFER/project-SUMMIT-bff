import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByUsername, saveUser } from "./userService.js";
import CustomError from "../error/customError.js";

async function userSignUp(userData) {
  console.log("authService: userSignUp");

  // Check for existing user for username
  const duplicateUser = await findUserByUsername(userData.userName);

  if (duplicateUser) {
    throw new CustomError(409, "User with username already exists");
  }

  // encrypt password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(userData.password, salt);

  userData.password = hashPassword;

  try {
    const savedUser = await saveUser(userData);
    return savedUser;
  } catch (error) {
    throw new CustomError(500, "Error saving user");
  }
}

async function userSignIn(userName, password) {
  console.log("authService: userSignIn");

  // Check for existing user for username
  const user = await findUserByUsername(userName);

  console.log(user);

  if (!user) {
    throw new CustomError(401, "No such user");
  }

  //evaluate password
  const match = await bcrypt.compare(password, user.password);

  // create jwts
  if (match) {
    const payload = {
      userName: user.userName,
      userEmail: user.userEmail,
      accountType: user.accountType,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return accessToken;
  }
}

export { userSignUp, userSignIn };
