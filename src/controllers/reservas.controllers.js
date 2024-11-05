import Reserva from "../database/model/reserva.js";

export const crearReserva = async (req, res) => {
    try {
      const reservaNueva = new Reserva(req.body);
      await reservaNueva.save();
      res.status(201).json({ mensaje: "La reserva fue creada correctamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error, no se pudo crear la reserva" });
    }
  };