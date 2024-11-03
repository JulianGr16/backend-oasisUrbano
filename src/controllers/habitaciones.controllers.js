import Habitacion from "../database/model/habitaciones.js";

//CREAR
export const crearHabitacion = async (req, res) => {
  try {
    const habitacionNueva = new Habitacion(req.body);
    await habitacionNueva.save();
    res.status(201).json({ mensaje: "La habitacion fue creada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo crear la habitacion" });
  }
};

//LEER
export const listarHabitaciones = async (req, res) => {
  try {
    //pedir a la bd la coleccion
    const arrayHabitaciones = await Habitacion.find();
    res.status(200).json(arrayHabitaciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo crear la habitacion" });
  }
};

//PUT o EDITAR
export const editarHabitacion = async (req, res) => {
  try {
    const habitacionBuscada = await Habitacion.findById(req.params.id);
    console.log(habitacionBuscada);
    if (!habitacionBuscada) {
      return res
        .status(404)
        .json({ mensaje: "La habitacion solicitada no existe" });
    }
    await Habitacion.findByIdAndUpdate(req.params.id, req.body);
    res
      .status(200)
      .json({ mensaje: "La habitacion fue editada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error no se pudo editar la habitacion" });
  }
};

// BORRAR
export const borrarHabitacion = async (req, res) => {
  try {
    const habitacionBuscada = await Habitacion.findById(req.params.id);
    console.log(habitacionBuscada);
    if (!habitacionBuscada) {
      return res
        .status(404)
        .json({ mensaje: "La habitacion solicitada no existe" });
    }
    await Habitacion.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ mensaje: "La habitacion fue eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error no se pudo borrar la habitacion" });
  }
};
