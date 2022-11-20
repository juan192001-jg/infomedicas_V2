import express from "express";
const router = express.Router();
import sucursal from "../Controllers/Sucursal.js";
import validarLogin from '../middleware/validarAutenticacion.js';

router.post("/", validarLogin, sucursal.agregar);
router.get("/", validarLogin, sucursal.listar);
router.delete("/:id", validarLogin, sucursal.eliminar);
router.put("/:id", validarLogin, sucursal.editar);
router.get("/:id", validarLogin, sucursal.listarUno);

export default router;