import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const db = new PrismaClient();
const { SECRET_KEY } = process.env;

const router = Router();

const getUser = async (email) => {
  const response = db.viajantes.findUnique({
    where: {
      email,
    },
  });
  return response;
};

//THIS ROUTE RETURN ALL USERS OF TABLE VIAJANTES
router.get("/", async (req, res) => {
  try {
    const allUsers = await db.viajantes.findMany();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res
      .status(500)
      .send("Error no servidor, contate seu adminitrador de TI");
  }
});

//THIS ROUTE RETURN ALL USERS OF TABLE VIAJANTES
router.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const userInfo = jwt.verify(token, SECRET_KEY, {}, (error, userInfo) => {
      if (error) throw error;
      res.json(userInfo);
    });
  } else {
    res.json(null);
  }
});

//THIS ROUTE IS TO CREATE NEW USER
router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const hashpass = await bcrypt.hash(password, 10);

  try {
    const newUser = await db.viajantes.create({
      data: {
        email,
        name,
        password: hashpass,
      },
    });

    const { id } = newUser;
    const payload = { id, name, email };
    const TOKEN = jwt.sign(payload, SECRET_KEY, {}, (error, token) => {
      if (error) throw error;

      res.cookie("token", TOKEN).status(200).json(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//THIS ROUTE IS TO AUTHENTICATE
router.put("/", async (req, res) => {
  const { email, password } = req.body;
  const query = await getUser(email); //function to query if exists a user with this mail

  //validate if return one user
  if (!query) {
    return res.status(404).json({
      success: false,
      error: "404 - Usuário não encontrado",
    });
  }

  //validate if password match with the hash of password
  const validatePass = await bcrypt.compare(password, query.password);

  if (validatePass) {
    return res.status(200).send("Senha bateu!");
  } else {
    return res.status(401).send("Senha incorreta!");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = await getUser(email); //função para consultar o usuário no banco

  //valildação se a consulta retornou algum resultado ou retornou null
  if (!query) {
    return res.status(404).json({
      success: false,
      error: "404 - Usuário não encontrado",
    });
  }

  const validatePass = await bcrypt.compare(password, query.password);

  if (validatePass) {
    const { id, name, email } = query;
    const payload = { id, name, email };
    const token = jwt.sign(payload, SECRET_KEY);
    res.cookie("token", token).status(200).json({ id, name, email });
  } else {
    return res.status(401).send("Senha incorreta!");
  }
});

export default router;
