import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {

    // Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email: email })

    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg:error.message })
    }

    try {
        const newUser = new Usuario(req.body)
        newUser.token = generarId()
        const newUserAlmacenado = await newUser.save()
        res.json(newUserAlmacenado)
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar
}