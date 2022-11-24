import express from "express";
import dotenv from "dotenv";
import conectarBD from "./config/db.js";
import router from "./routes/usuarioRoutes.js";

// Montamos el framework express
const app = express()

// Para que el servidor pueda leer los datos de tipo json
app.use(express.json())

// Cargamos la configuración de dotenv para obtener las variables de entorno
dotenv.config()

// Conectamos a la base de datos de Mongo
conectarBD()

//Routing
app.use('/api/usuarios', router)

// Para iniciar el servidor
const PORT = process.env.PORT || 4000
app.listen(4000, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
})