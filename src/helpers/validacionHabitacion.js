import { check } from "express-validator";
import resultadoValidaciones from "./resultadoValidaciones.js";

const validacionHabitacion = [
  check("numero")
    .notEmpty()
    .withMessage("El numero de la habtiacion es un dato obligatorio")
    .isLength({ min: 1, max: 1000 })
    .withMessage(
      "Las habitaciones tienen numeraciones de 1 a 1000 como maximo."
    ),
  check("tipo")
    .notEmpty()
    .withMessage("El tipo de habitación es un dato obligatorio.")
    .isIn(["Suite Standard", "Suite Junior", "Suite Premium"])
    .withMessage("El tipo de habitación no es válido."),
  check("precio")
    .notEmpty()
    .withMessage("El precio de la habitación es un dato obligatorio.")
    .isFloat({ min: 150, max: 200000 })
    .withMessage("El precio debe estar entre 150 y 200000."),
  check("fecha")
    .notEmpty()
    .withMessage("La fecha de disponibilidad es obligatoria.")
    .matches(/^\d{1,2}\/\d{1,2}\/\d{4} a \d{1,2}\/\d{1,2}\/\d{4}$/)
    .withMessage('La fecha debe estar en el formato "dd/mm/yyyy a dd/mm/yyyy"'),
  check("imagen")
    .notEmpty()
    .withMessage("La url de la imagen es un dato obligatorio")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage(
      "La imagen debe ser una url valida y debe terminar con uno de los siguientes formatos : jp,jpeg,gif y png. "
    ),

  (req, res, next) => resultadoValidaciones(req, res, next),
];
export default validacionHabitacion;
