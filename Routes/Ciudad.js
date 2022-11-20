import espress from 'express';
const router = espress.Router();
import Ciudad from '../Controllers/Ciudad.js';
import validarLogin from '../middleware/validarAutenticacion.js';


router.get("/", validarLogin, Ciudad.listar);
router.get("/:id", validarLogin, Ciudad.listarUno);
router.post("/", Ciudad.agregar);
router.delete("/:id", validarLogin, Ciudad.elimenar);
router.put("/:id", validarLogin, Ciudad.editar);
export default router;