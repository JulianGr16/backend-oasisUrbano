import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombreCompleto: {
      type: String,
      required: [true, 'El nombre completo del usuario es un dato obligatorio'],
      minLength: [5, 'La cantidad de caracteres mínimos es de 5'],
      maxLength: [25, 'La cantidad de caracteres máximos es de 25'],
      validate: {
        validator: (valor) => /^[A-Za-z\s]+$/i.test(valor),
        message: 'El nombre solo puede contener letras y espacios',
      },
      unique:true,
    },
    correoUsuario: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
      validate: {
        validator: (valor) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor),
        message: 'Debe ingresar un correo electrónico válido',
      },
    },
    contraseña: {
        type: String,
        required: true,
        minLength: 6, 
        maxLength:50,
        validate: {
          validator: function (contraseña) {
            return  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(contraseña);
          },
          message: "El password debe contener al menos una letra mayúscula, una letra minúscula y un número",
        },
      },
  });
  
  const Usuario = mongoose.model('usuario', usuarioSchema);
  
  export default Usuario;