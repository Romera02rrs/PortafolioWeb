import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro } from "../helpers/email.js";
import { emailOlvidePassword } from "../helpers/email.js";

// Obtener todos los usuarios  -  GET /api/usuarios
const registrar = async (req, res) => {

    // Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email: email })

    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg:error.message }) // Error 400 error de cliente
    }

    try {
        const newUser = new Usuario(req.body)
        newUser.token = generarId() // El token es para verifiacar las cuentas via email
        await newUser.save() // .save() manda la clase newUser donde se puede hacer referencia a la misma con this.

        emailRegistro(newUser)

        return res.json({ msg: 'Usuario creado correctamente' })
    } catch (error) {
        return res.json({ msg: 'Error al registrar al usuario: ' + error.message })
    }
}

// Autenticar usuario  -  POST /api/usuarios/autenticar
const autenticar = async (req, res) => {

    // Obtengo los datos del request
    const { email, password } = req.body

    // Obtenemos el usuario
    const usuario = await Usuario.findOne({email: email})

    // Comprobar si existe
    if(!usuario){
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    // Comprobar si está confirmado
    if(!usuario.confirmado){
        const error = new Error("El usuario no ha sido confirmado, revisa tu email")
        return res.status(403).json({ msg: error.message })
    }

    // Comprobar el password
    if(await usuario.comprobarPassword(password)){
        // Si está todo correcto envía una respuesta con los siguientes datos y con el JWT
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error("Password incorrecto")
        return res.status(403).json({ msg: error.message })
    }
}

// Obtener todos los usuarios  -  GET /api/usuarios
const confirmar = async (req, res) => {
    
    //res.json(await Usuario.find({ }))

    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token: token })
    
    if(!usuarioConfirmar){
        const error = new Error("Token No válido")
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''
        console.log(usuarioConfirmar);
        await usuarioConfirmar.save()
        return res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        const err = new Error("Token No válido")
        return res.status(403).json({ msg: err.message })
    }
}

// Obtener todos los usuarios  -  GET /api/usuarios
const olvidePassword = async (req, res) => {

    const { email } = req.body
    // Obtenemos el usuario
    const usuario = await Usuario.findOne({email: email})

    // Comprobar si existe
    if(!usuario){
        const error = new Error("El correo no existe")
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        emailOlvidePassword(usuario)
        res.json({ msg: "Hemos enviado un email con las instrucciones, puedes cerrar la ventana" })
    } catch (error) {
        console.log(error);
    }
}

// Obtener todos los usuarios  -  GET /api/usuarios
const comprobarToken = async (req, res) => { 
    const { token } = req.params
    const tokenValido = await Usuario.findOne({token:token})
    if(tokenValido){
        res.json({ msg: "Token valido" })
    }else{
        const error = new Error("Token no válido")
        return res.status(404).json({ msg: error.message })
    }
}

// Obtener todos los usuarios  -  GET /api/usuarios
const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({token:token})

    if(usuario){
        usuario.password = password
        usuario.token = ''
        await usuario.save()
        res.json({msg: "La contraseña ha sido modificada con éxito"})
    }else{
        const error = new Error("Token no válido")
        return res.status(404).json({ msg: error.message })
    }
}

// Obtener todos los usuarios  -  GET /api/usuarios
const perfil = async (req, res) => {
    const { usuario } = req

    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}