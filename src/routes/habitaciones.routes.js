import { Router } from "express";
import { borrarHabitacion, crearHabitacion, editarHabitacion, listarHabitaciones, obtenerHabitacion } from "../controllers/habitaciones.controllers.js";

const router = Router();
router.route('/habitaciones').post(crearHabitacion).get(listarHabitaciones)
router.route('/habitaciones/:id').put(editarHabitacion).delete(borrarHabitacion).get(obtenerHabitacion)

export default router