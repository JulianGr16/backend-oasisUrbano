import { Router } from "express";
import validacionReserva from "../helpers/validacionReserva.js";
import { crearReserva } from "../controllers/reservas.controllers.js";


const reservasRouter = Router();
reservasRouter.route('/reservas').post([validacionReserva],crearReserva)


export default reservasRouter