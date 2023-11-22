import express from "express";
import mongoose from "mongoose";
const server = express();
const localHost =  8000





server.listen(localHost, () => {
  console.log(`http://localhost:${localHost}/`);
});
