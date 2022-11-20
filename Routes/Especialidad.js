import express from "express"
const router = express.Router()
import Especialidad from "../Controllers/Especialidad.js";
import validarLogin from '../middleware/validarAutenticacion.js';

router.get("/", validarLogin, Especialidad.listar);
router.get("/:id", validarLogin, Especialidad.listar);
router.post("/", validarLogin, Especialidad.agregar);
router.delete("/:id", validarLogin, Especialidad.eliminar);
router.put("/:id", validarLogin, Especialidad.editar);
export default router;