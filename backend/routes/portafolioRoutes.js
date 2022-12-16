import express from 'express'
import checkAuth from "../middleware/checkAuth.js"

import {
  obtenerPortafolios,
  nuevoPortafolio,
  obtenerPortafolio,
  editarPortafolio,
  eliminarPortafolio,
} from "../controllers/portafolioController.js";

const router = express.Router();


router.route('/')
  .get(checkAuth, obtenerPortafolios)
  .post(checkAuth, nuevoPortafolio)

router.route('/:id')
  .get(checkAuth, obtenerPortafolio)
  .put(checkAuth, editarPortafolio)
  .delete(checkAuth, eliminarPortafolio)


export default router