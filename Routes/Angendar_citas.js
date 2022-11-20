import express from "express";
import Agendarcita from "../Controllers/Angendar_citas.js";
import validarLogin from '../middleware/validarAutenticacion.js';

const router = express.Router();
router.get("/", validarLogin, Agendarcita.listar);
router.post("/", validarLogin, Agendarcita.agregar);
router.delete("/:id", validarLogin, Agendarcita.eliminar);
router.get("/:id", validarLogin, Agendarcita.listarUno);
router.put("/:id", validarLogin, Agendarcita.editar);

export default router;