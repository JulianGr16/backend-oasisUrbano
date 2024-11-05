import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 25,
    validate: {
      validator: (valor) => /^[A-Za-z\s]+$/i.test(valor),
      message: "El nombre solo puede contener letras y espacios",
    },
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
    minLength: 8, // Cambié el mínimo a 8 para que coincida con la validación
    maxLength: 100, // Aumenté el máximo a 100 para permitir hashes de bcrypt
    validate: {
      validator: function (contraseña) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(contraseña);
      },
      message:
        "El password debe contener al menos una letra mayúscula, una letra minúscula y un número",
    },
  },
  correoUsuario: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (valor) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor),
      message: "Debe ingresar un correo electrónico válido",
    },
  },
  roll: {
    type: String,
    required: true,
    enum: ["Usuario", "Admin"],
  },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
