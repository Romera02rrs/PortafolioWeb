import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken
} from "../controllers/usuarioController.js";

// Creación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar); // Hace login de un usuario
router.get("/confirmar/:token", confirmar); // Confirma el token que se validará por email
router.post("/olvide-password", olvidePassword); // Verifica que exista el usuario y establece un token
router.post("/olvide-password/:token", comprobarToken);

export default router;
