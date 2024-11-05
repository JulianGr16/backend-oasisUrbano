import mongoose, { Schema } from "mongoose";

const reservaSchema = new Schema({
  nombreApellido: {
    type: String,
    required: [true, 'El nombre de usuario es un dato obligatorio'],
    minlength: [5, 'El nombre debe tener al menos 5 caracteres'],
    maxlength: [50, 'El nombre debe tener un máximo de 20 caracteres'],
  },
  tipoHabitacion: {
    type: String,
    required: [true, 'El tipo de habitación es un dato obligatorio'],
    enum: ["Suite Standard", "Suite Junior", "Suite Premium"],
  },
  fecha: {
    type: String,
    required: [true, 'La fecha de disponibilidad es obligatoria'],
    match: [
      /^\d{1,2}\/\d{1,2}\/\d{4} a \d{1,2}\/\d{1,2}\/\d{4}$/,
      'La fecha debe estar en el formato "dd/mm/yyyy a dd/mm/yyyy"',
    ],
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    validate: {
      validator: (valor) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valor);
      },
      message: 'El correo electrónico debe tener un formato válido',
    },
  },
});

const Reserva = mongoose.model("Reserva", reservaSchema);

export default Reserva;
