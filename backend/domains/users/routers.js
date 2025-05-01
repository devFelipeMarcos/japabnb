import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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

//THIS ROUTE IS TO CREATE NEW USER
router.post("/", async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400);
  }
  const hashpass = await bcrypt.hash(password, 10);

  try {
    const newUser = await db.viajantes.create({
      data: {
        email,
        name,
        password: hashpass,
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .send("Error no servidor, contate o suporte técnico!");
  }
});

//THIS ROUTE IS TO AUTHENTICATE
router.put("/", async (req, res) => {
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
    const { id, name } = query;
    return res.status(200).json({ id, name, email });
  } else {
    return res.status(401).send("Senha incorreta!");
  }
});

export default router;
