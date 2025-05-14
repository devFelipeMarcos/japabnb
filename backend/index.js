import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import UserRoutes from "./domains/users/routers.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// const db = new PrismaClient();

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
