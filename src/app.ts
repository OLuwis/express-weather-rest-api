import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { authRouter } from "@auth/auth.route.js";

export const app = express();
export const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRouter);