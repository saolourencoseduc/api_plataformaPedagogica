import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { PoolClient } from "pg";
import indexRouter from "../routes/indexRoutes";
import pool from "./database";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("API de exemplo para o curso de Node.js");
}
);

interface ExtendedRequest extends Request {
  db?: PoolClient;
}

// Middlewares
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados
app.use(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  console.log('CHAMANDO O BANCO DE DADOS');
  try {
    const client: PoolClient = await pool.connect();
    req.db = client;
    console.log('*** Conexão com o banco de dados estabelecida *** ');
    next();
  } catch (error) {
    console.error("*** Erro ao conectar ao banco de dados ***", error);
    res.status(500).json({ error: "*** Erro Interno no Servidor ***" });
  }
});

// Exemplo de middleware

// Rotas
app.use("/api", indexRouter);

// Liberação da conexão após a conclusão da solicitação
app.use((req: ExtendedRequest, res: Response, next: NextFunction) => {
  const db = req.db;
  if (db) {
    db.release();
  }
  next();
});

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .send("*** Erro Interno no Servidor! Por favor Verifique seu Servidor ***");
});

// Configuração do servidor
const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`+++ O servidor está rodando na porta ${PORT} +++`);
    console.log(`+++ O servidor está acessível em http://localhost:${PORT} +++`);
  }
  );
