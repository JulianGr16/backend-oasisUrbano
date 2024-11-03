import Usuario from "../database/model/usuarios.js";

//CREAR
export const crearUsuario = async (req, res) => {
  try {
    const usuarioNuevo = new Usuario(req.body);
    await usuarioNuevo.save();
    res.status(201).json({ mensaje: "El usuario fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo crear el usuario" });
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
