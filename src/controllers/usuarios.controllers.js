import Usuario from "../database/model/usuarios.js";
import bcrypt from "bcrypt";
//CREAR
export const crearUsuario = async (req, res) => {
  try {
    // Desestructurar los datos del cuerpo de la solicitud
    const { correoUsuario, contraseña, nombreCompleto, roll } = req.body;

    // Validar si el usuario existe
    const usuarioExistente = await Usuario.findOne({ correoUsuario });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Este correo ya se encuentra registrado" });
    }

    // Crear el nuevo usuario con rol "Usuario" por defecto
    const nuevoUsuario = new Usuario({
      correoUsuario,
      contraseña, // Aún no se ha hasheado aquí
      nombreCompleto,
      roll, // Asigna el rol "Usuario" por defecto
    });

    // Hashear y encriptar la contraseña
    const saltos = bcrypt.genSaltSync(10);
    nuevoUsuario.contraseña = bcrypt.hashSync(contraseña, saltos);

    // Guardar el nuevo usuario en la base de datos (esperar a que se complete)
    await nuevoUsuario.save();

    // Enviar respuesta de confirmación
    res.status(201).json({ mensaje: "El usuario fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "Ocurrió un error, no se pudo crear el usuario" });
  }
};
//LEER
export const listarUsuarios = async (req, res) => {
  try {
    //pedir a la bd la coleccion
    const arrayUsuarios = await Usuario.find();
    res.status(200).json(arrayUsuarios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo crear el usuario" });
  }
};

//PUT o EDITAR
export const editarUsuario = async (req, res) => {
  try {
    const usuarioEncontrado = await Usuario.findById(req.params.id);
    console.log(usuarioEncontrado);
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "El usuario fue editado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error no se pudo editar el usuario" });
  }
};

// BORRAR
export const borrarUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    console.log(usuarioBuscado);
    if (!usuarioBuscado) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "El usuario fue eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error no se pudo borrar el usuario" });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (!usuarioBuscado) {
      return res.status(404).json({ mensaje: "El usuario no fue encontrado" });
    }
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error no se pudo obtener el usuario" });
  }
};

export const Login = async (req, res) => {
  try {
    const { correoUsuario } = req.body;
    const usuarioExistente = await User.findOne({ correoUsuario });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Correo o contraseña incorrecta!" });
    }
    // generar un token
    const token = await generarJWT(
      usuarioExistente._id,
      usuarioExistente.correoUsuario
    );

    // Respondemos afirmativamente
    res.status(200).json({
      mensaje: "Los datos del usuario son válidos",
      token,
      id: usuarioExistente._id,
      uid: usuarioExistente._id,
      nombre: usuarioExistente.nombreUsuario,
      roll: usuarioExistente.roll, // Asegúrate de que este campo esté en tu modelo
    });
  } catch (error) {
    {
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error al intentar logearse!" });
    }
  }
};
