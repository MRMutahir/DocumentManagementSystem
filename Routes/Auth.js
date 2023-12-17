import express from "express";

import { signup, signin } from "../Controler/Auth.js";
const authentication = express.Router();
authentication.post("/signup", signup);
authentication.post("/signin", signin);

// authRoutes.post("/google", googleAuth);

export { authentication };
