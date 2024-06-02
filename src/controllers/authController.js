import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import { userSignUp, userSignIn } from "../services/authService.js";
import CustomError from "../error/customError.js";

// Define Joi schema for user data validation
const signUpSchema = Joi.object({
  userName: Joi.string().required().label("Username"),
  userEmail: Joi.string().email().required().label("Email"),
  password: passwordComplexity().required().label("Password"),
});

const signUp = async (req, res) => {
  try {
    const userData = req.body;

    console.log("authController: signUp");

    // // Validate the incoming request payload using Joi schema
    // const { error } = signUpSchema.validate(userData);
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }

    // Validate the incoming request payload
    if (
      !userData.userName ||
      !userData.userEmail ||
      !userData.password ||
      !userData.accountType ||
      !userData.accountStatus
    ) {
      return res.status(400).json({ message: "User missing required fields" });
    }

    const savedUser = await userSignUp(userData);
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

const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    console.log("authController: signIn");

    console.log(`Username: ${userName} Password: ${password}`);

    // Validate the incoming request payload
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const token = await userSignIn(userName, password);
    res.status(200).send({ data: token, message: "logged in successfully" });
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

const signOut = (req, res) => {
  res.send("SignOut!");
};

export { signUp, signIn, signOut };
