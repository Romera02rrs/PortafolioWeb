import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import conectarBD from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import portafolioRoutes from "./routes/portafolioRoutes.js"

// Montamos el framework express
const app = express()

// Para que el servidor pueda leer los datos de tipo json
app.use(express.json())

// Cargamos la configuración de dotenv para obtener las variables de entorno
dotenv.config()

// Conectamos a la base de datos de Mongo
conectarBD()

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL, process.env.DEV_URL]

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}

app.use(cors(corsOptions))

//Routing
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/portafolio", portafolioRoutes)

// Para iniciar el servidor
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
})
