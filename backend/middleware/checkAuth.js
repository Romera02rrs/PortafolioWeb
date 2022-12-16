import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const checkAuth = async (req, res, next) => {

    // Obtiene las variables de la autorización mediante los headers
    const authorization = req.headers.authorization
    let token

    // Si hay un Bearer obtenemos el token
    if(authorization && authorization.startsWith("Bearer")){
       
        try {
            // Eliminamos la palabra Bearer del header
            token = authorization.split(' ')[1]
            // Verificamos el jwt comparando la firma y obtenemos el JWT que contiene el id del usuario
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Establecemos en los headers el Usuario y le eliminamos propiedades que sean innecesarias y que comprometan la seguridad
            req.usuario = await Usuario.findById(decoded.id)
              .select("-password -confirmado -token -createdAt -updatedAt -__v");
            
            // Pasamos el middleware y nos dirigimos a la siguiente función del route
            return next()
        } catch (error) {
            return res.status(404).json({msg: error})
        }                           
    }else{
        const error = new Error('Token no válido')
        return res.status(401).json({msg: error.message})
    }

    // // Si no se envía ningun token en el header
    // if(!token){
    //     const error = new Error('Token no válido')
    //     return res.status(401).json({msg: error.message})
    // }

    // next()
}

export default checkAuth