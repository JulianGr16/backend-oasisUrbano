import mongoose, { Schema } from "mongoose";

const habitacionSchema = new Schema({
  numero: {
    type: Number,
    required: [true, 'El número de la habitación es un dato obligatorio'],
    min: 1,
    max: 1000,
    unique: true,
  },
  tipo: {
    type: String,
    required:[true, 'El tipo de habitación es un dato obligatorio'],
    enum: ["Suite Standard", "Suite Junior", "Suite Premium"],
  },
  precio: {
    type: Number,
    required: [true, 'El precio de la habitación es un dato obligatorio'],
    min: [150, 'El precio mínimo es 150'],
    max: [200000, 'El precio máximo es 2000$'],
     },
  fecha: {
    type: String,
    required:[true, 'La fecha de disponibilidad es obligatoria'],
    match: [
      /^\d{1,2}\/\d{1,2}\/\d{4} a \d{1,2}\/\d{1,2}\/\d{4}$/,
      'La fecha debe estar en el formato "dd/mm/yyyy a dd/mm/yyyy"',
    ],
  },
  imagen: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    validate: {
      validator: (valor) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(valor);
      },
    }
  }
});

const Habitacion = mongoose.model("habitacion", habitacionSchema);

export default Habitacion;
