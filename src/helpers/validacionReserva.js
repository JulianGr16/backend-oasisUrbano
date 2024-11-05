import { check } from "express-validator";
import resultadoValidaciones from "./resultadoValidaciones.js";

const validacionReserva = [
    check("nombreApellido")
      .notEmpty()
      .withMessage("El nombre y apellido es un dato obligatorio")
      .isLength({ min: 5, max: 50 })
      .withMessage(
        "Ingrese un nombre y apellido con un minimo de 5 y 50 caracteres."
      ),
    check("tipoHabitacion")
      .notEmpty()
      .withMessage("El tipo de habitación es un dato obligatorio.")
      .isIn(["Suite Standard", "Suite Junior", "Suite Premium"])
      .withMessage("El tipo de habitación no es válido."),
      check("fecha")
      .notEmpty()
      .withMessage("La fecha de ingreso y salida  es obligatoria.")
      .matches(/^\d{1,2}\/\d{1,2}\/\d{4} a \d{1,2}\/\d{1,2}\/\d{4}$/)
      .withMessage('La fecha debe estar en el formato "dd/mm/yyyy a dd/mm/yyyy"'),
      check('email')
      .isEmail()
      .withMessage('Debe ser un correo electrónico válido')
      .normalizeEmail(),
  
    (req, res, next) => resultadoValidaciones(req, res, next),
  ];
  export default validacionReserva;
  