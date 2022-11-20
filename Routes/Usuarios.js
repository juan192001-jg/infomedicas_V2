import espress from 'express';
const router = espress.Router();
import Usuarios from '../Controllers/Usuarios.js';
import validarLogin from '../middleware/validarAutenticacion.js';


router.get("/", validarLogin, Usuarios.listar);
router.get("/:id", validarLogin, Usuarios.listarUno);
router.post("/", validarLogin, Usuarios.agregar);
router.put("/:id", validarLogin, Usuarios.editar);
router.delete("/:id", validarLogin, Usuarios.eliminar);
router.post("/login", Usuarios.login);
export default router