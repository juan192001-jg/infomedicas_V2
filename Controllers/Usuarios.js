import Usuario from '../models/Usuario.js';
import bcrypt from "bcrypt";
import generaJWT from '../helpers/generaJTW.js';


const Usuarios = {
    agregar: async(req, res) => {
        //evitar usuarios duplicados por el usuarioAcceso
        const { usuarioAcceso } = req.body;
        const existeUsuario = await Usuario.findOne({ usuarioAcceso });

        if (existeUsuario) {
            const error = new Error("Usuario ya existe en la base de datos.");
            return res.status(400).json({ msg: error.message, ok: "NO" });
        }

        try {
            const usuario = new Usuario(req.body);
            const usuarioGuardado = await usuario.save();

            res.json({ body: usuarioGuardado, msg: "Documento creado correctamente.", ok: "SI" });
        } catch (error) {
            console.log(error);
        }
    },

    listar: async(req, res) => {
        const usuarios = await Usuario.find().populate('Ciudad', {
            nombreCiudad: 1,
            _id: 0
        })
        res.json(usuarios)
    },
    eliminar: async(req, res) => {
        //recibir los parametros por url
        const { id } = req.params;

        //validar si existe el documento por su id
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "NO" });
        }

        try {
            await usuario.deleteOne();
            res.json({ msg: "Documento eliminado correctamente.", ok: "SI" });
        } catch (error) {
            console.log(error);
        }
    },
    editar: async(req, res) => {
        //recibir los parametros por url
        const { id } = req.params;

        //validar si existe el documento por su id
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "NO" });
        }

        //recibir los datos desde el formulario
        usuario.Ciudad = req.body.Ciudad || usuario.Ciudad;
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.apellido = req.body.apellido || usuario.apellido;
        usuario.corre = req.body.corre || usuario.corre;
        usuario.Tipo_Usuario = req.body.Tipo_Usuario || usuario.Tipo_Usuario;
        usuario.telefono = req.body.telefono || usuario.telefono;
        usuario.dirrecion = req.body.dirrecion || usuario.dirrecion;
        usuario.genero = req.body.genero || usuario.genero;
        usuario.tipoDocumento = req.body.tipoDocumento || usuario.tipoDocumento;
        usuario.numeroDocumento = req.body.numeroDocumento || usuario.numeroDocumento;
        usuario.edad = req.body.edad || usuario.edad;
        usuario.fechaNacimineto = req.body.fechaNacimineto || usuario.fechaNacimineto;
        usuario.usuarioAcesso = req.body.usuarioAcesso || usuario.usuarioAcesso;
        usuario.claveAcceso = req.body.claveAcceso || usuario.claveAcceso;
        usuario.rol = req.body.rol || usuario.rol;
        usuario.estados = req.body.estados || usuario.estados;

        try {
            const usuarioGuardado = await usuario.save();
            res.json({ body: usuarioGuardado, msg: "Documento actualizado correctamente.", ok: "SI" });
        } catch (error) {
            console.log(error);
        }
    },
    listarUno: async(req, res) => {
        //recibir los parametros por url
        const { id } = req.params;

        //validar si existe el documento por su id
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "NO" });
        }

        res.json(usuario);
    },
    login: async(req, res) => {
        const { usuarioAcesso, claveAcceso } = req.body;
        const usuario = await Usuario.findOne({ usuarioAcesso });
        if (!usuario) {
            const error = new Error("El Usuario/Contraseña  Incorectos.");
            return res.status(404).json({ msg: error.message, ok: "NO_EXISTE" });
        }
        if (await usuario.comprobarClave(claveAcceso)) {
            res.json({
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                usuarioAcesso: usuario.usuarioAcesso,
                tokenJwt: generaJWT(usuario._id)
            })

        } else {
            const error = new Error("El Usuario/Contraseña  Incorectos.");
            res.json({ msg: error.message, ok: "CLAVE_INCORRECTA" });
        }

    }

}

export default Usuarios;