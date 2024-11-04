import { Router } from "express";
import { borrarUsuario, crearUsuario, editarUsuario, listarUsuarios, obtenerUsuario } from "../controllers/usuarios.controllers.js";

const router = Router();
router.route('/usuarios').post(crearUsuario).get(listarUsuarios)
router.route('/usuarios/:id').put(editarUsuario).delete(borrarUsuario).get(obtenerUsuario)

export default router