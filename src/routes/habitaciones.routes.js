import { Router } from "express";
import { borrarHabitacion, crearHabitacion, editarHabitacion, listarHabitaciones } from "../controllers/habitaciones.controllers.js";

const router = Router();
router.route('/habitaciones').post(crearHabitacion).get(listarHabitaciones)
router.route('/habitaciones/:id').put(editarHabitacion).delete(borrarHabitacion)

export default router