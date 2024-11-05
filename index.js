import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import "./src/database/dbConnection.js";
import habitacionRouter from "./src/routes/habitaciones.routes.js";
import usuarioRouter from "./src/routes/usuarios.routes.js";

dotenv.config();

//1-configurar un puerto
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.info("estoy escuchando el puerto " + app.get("port"));
});

//2-configurar middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

//3-configurar las rutas
// http://localhost:4000/prueba
app.use("/api/", habitacionRouter);
app.use("/api/", usuarioRouter);
