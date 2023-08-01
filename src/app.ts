import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { authRouter } from "@auth/auth.route.js";
import { locationRouter } from "@location/location.route.js";

export const app = express();
export const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);
app.use(locationRouter);