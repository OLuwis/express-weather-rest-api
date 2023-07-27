import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "@users/users.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(userRouter);

export { app, port };