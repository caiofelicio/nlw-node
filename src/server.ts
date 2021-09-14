import dotenv from "dotenv";
import "express-async-errors";
import "reflect-metadata";
import { app } from "./app";
import "./database";

dotenv.config();

app.listen(3333, () => {
  console.log("http://localhost:3333");
});
