import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authentication } from "./Routes/Auth.js";
import {addStudentrouter} from "./Routes/AddStudent.js"
// import { routeAddStudent } from "./Routes/AddStudent.js";
const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(cors());
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
dotenv.config();
const cl = console.log.bind(console);
const localHost = 8000;
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      cl("db connect");
    })
    .catch((error) => {
      cl(error);
    });
};
server.use("/addmin/auth", authentication);
server.use("/addmin/add", addStudentrouter);
// server.use("/api/students", routeAddStudent);

server.listen(localHost, () => {
  dbConnect();
  cl(`http://localhost:${localHost}/`);
});
