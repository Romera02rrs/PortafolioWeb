import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

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
        const newUserAlmacenado = await newUser.save() // .save() manda la clase newUser donde se puede hacer referencia a la misma con this.
        return res.json(newUserAlmacenado)
    } catch (error) {
        console.log(error);
    }
}

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
        const error = new Error("El usuario no ha sido confirmado")
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
        //res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error);
    }

    res.json(usuarioConfirmar)
}

const olvidePassword = async (req, res) => {

    const { email } = req.body
    // Obtenemos el usuario
    const usuario = await Usuario.findOne({email: email})

    // Comprobar si existe
    if(!usuario){
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        res.json({ msg: "hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error);
    }
}

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

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken
}