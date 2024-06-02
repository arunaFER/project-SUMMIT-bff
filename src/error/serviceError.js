// serviceError.js
import CustomError from "./customError.js";

const handleServiceError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error(
      `Server responded with status ${error.response.status}: ${error.response.data.message}`
    );
    throw new CustomError(
      error.response.status,
      error.response.data.message,
      error.response.data.code || "SERVICE_ERROR"
    );
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received from server");
    throw new CustomError(
      500,
      "No response received from server",
      "NO_RESPONSE"
    );
  } else {
    // Something happened in setting up the request that triggered an error
    console.error("Error setting up request:", error.message);
    throw new CustomError(
      500,
      "Error setting up request",
      "REQUEST_SETUP_ERROR"
    );
  }
};

export default handleServiceError;

// const handleServiceError = (error) => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     console.error(
//       `Server responded with status ${error.response.status}: ${error.response.data.message}`
//     );
//     throw new Error(
//       `Server responded with status ${error.response.status}: ${error.response.data.message}`
//     );
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error("No response received from server");
//     throw new Error("No response received from server");
//   } else {
//     // Something happened in setting up the request that triggered an error
//     console.error("Error setting up request:", error.message);
//     throw new Error("Error setting up request");
//   }
// };

// export default handleServiceError;
