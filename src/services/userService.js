import axios from "axios";
import handleServiceError from "../error/serviceError.js";

async function findAllUsers() {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/user/");
    // console.log("Response data:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
}

async function findUserById(userId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/user/${userId}`
    );
    // console.log("Response data:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
}

async function saveUser(userData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/",
      userData
    );

    console.log("Response data:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
}

export { findAllUsers, findUserById, saveUser };
