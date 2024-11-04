import Usuario from "../database/model/usuarios.js";
import bcrypt from 'bcrypt';
//CREAR
export const crearUsuario = async (req, res) => {
  try {
    //validar si el usuario existe 
    const {email, password, nombreUsuario} = req.body
    const usuarioExistente = await Usuario.findOne({email});
    if(usuarioExistente){
      return res
      .status(400)
      .json({mensaje: "este correo ya se encuentra registrado"})
    }
    //crear el nuevo usuario
    const nuevoUsuario = new Usuario(req.body);
    //hashear y encriptar el password
    const saltos = bcrypt.genSaltSync(10)
    nuevoUsuario.password = bcrypt.hashSync(password, saltos)
    nuevoUsuario.save()
    //enviar respuesta de confirmacion
    res.status(201).json({mensaje: "el usuario fue creado correctamente"})
  } catch (error) {
    console.error(error);
    res
      .status(400)
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

export const Login = async (req, res) =>{
  try {
    const {email} = req.body;
    const usuarioExistente = await User.findOne({email});
    if(!usuarioExistente){
      return res
      .status(400)
      .json({mensaje: "Correo o contraseña incorrecta!"});
    }
        // generar un token
        const token = await generarJWT(usuarioExistente._id, usuarioExistente.email)
        // respodemos afirmativamente
        res.status(200).json({
          mensaje: 'Los datos del usuario son validos',
          token,
          id: usuarioExistente._id
        })
    
  } catch (error) {
    {
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error al intentar logearse!" });
    }
  }
}
