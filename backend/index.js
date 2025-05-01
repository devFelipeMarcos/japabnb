import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import UserRoutes from "./domains/users/routers.js";
import cors from "cors";

const db = new PrismaClient();

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
