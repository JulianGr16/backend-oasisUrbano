import mongoose, { Schema } from "mongoose";

const habitacionSchema = new Schema({
  numero: {
    type: Number,
    required: [true, 'El número de la habitación es obligatorio'],
    min: 1,
    max: 1000,
    unique: true,
  },
  tipo: {
    type: String,
    required:[true, 'El tipo de habitación es obligatorio'],
    enum: ["Suite Standard", "Suite Junior", "Suite Premium"],
  },
  precio: {
    type: Number,
    required: true,
    min: 150,
    max: 200000,
     },
  fecha: {
    type: String,
    required: true,
    match: [
      /^\d{1,2}\/\d{1,2}\/\d{4} a \d{1,2}\/\d{1,2}\/\d{4}$/,
      'La fecha debe estar en el formato "dd/mm/yyyy a dd/mm/yyyy"',
    ],
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: (valor) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(valor);
      },
    }
  }
});

const Habitacion = mongoose.model("habitacion", habitacionSchema);

export default Habitacion;
