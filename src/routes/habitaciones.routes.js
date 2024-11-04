import { Router } from "express";
import { borrarHabitacion, crearHabitacion, editarHabitacion, listarHabitaciones, obtenerHabitacion } from "../controllers/habitaciones.controllers.js";
import validacionHabitacion from "../helpers/validacionHabitacion.js";

const router = Router();
router.route('/habitaciones').post([validacionHabitacion],crearHabitacion).get(listarHabitaciones)
router.route('/habitaciones/:id').put(editarHabitacion).delete(borrarHabitacion).get(obtenerHabitacion)

export default router