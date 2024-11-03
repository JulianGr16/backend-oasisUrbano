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
    minLength: 6,
    maxLength: 50,
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
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
