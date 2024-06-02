import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./src/routes/index.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const port = process.env.PORT || 3500;

const app = express();

// middleware
// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/v1/bff", router);

// middleware for custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
