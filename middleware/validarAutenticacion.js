import jwt from "jsonwebtoken";
import Usuario from '../models/Usuario.js';

const validarLogin = async(req, res, next) => {
    const token = req.headers.token
    if (token) {
        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Usuario.findById(decode.id).select(
                "-Ciudad -nombre -apellido -corre -Tipo_Usuario -telefono -dirrecion -genero -tipoDocumento -numeroDocumento -edad -fechaNacimineto  -rol -estados  -createdAt -updatedAt -__v"
            );
            return next();

        } catch (e) {
            return res.status(404).json({ msg: "Hubo un error con el token", ok: "TOKEN_INVALIDO" });
        }

    }
    if (!token) {
        const error = new Error("Token Invalido");
        return res.status(401).json({ msg: error.message, ok: "TOKEN_INVALIDO" });
    }
    next();
}
export default validarLogin;