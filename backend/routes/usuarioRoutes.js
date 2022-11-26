import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js"

// Creación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar); // Hace login de un usuario
router.get("/confirmar/:token", confirmar); // Confirma el token que se validará por email
router.post("/olvide-password", olvidePassword); // Verifica que exista el usuario y establece un token
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword); // Comprueba el token y establece la nueva contraseña

// Middleware que se ejecuta antes de "perfil" y pasa a la siguiente función con next()
router.get('/perfil', checkAuth, perfil)

export default router;
