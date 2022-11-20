import Especialidades from "../models/Especialidad.js";

const especialidadControllers = {
    agregar: async(req, res) => {
        const { nombreEspecialidad } = req.body;
        const exitesEspecilidad = await Especialidades.findOne({ nombreEspecialidad });
        if (exitesEspecilidad) {
            const error = new Error("LA ESPECIALIDA YA EXISTE");
            return res.status(400).json({ msg: error.message, ok: 'NO' });
        }
        try {
            const newEspocilidad = await Especialidades(req.body);
            const especilidadGuardada = await newEspocilidad.save();
            res.json({ body: especilidadGuardada, mgs: "Documento Guardado Corectamente" });

        } catch (error) {
            console.log(error);
        }
    },
    listar: async(req, res) => {

        const especialidad = await Especialidades.find();
        res.json(especialidad);

    },

    eliminar: async(req, res) => {
        const { id } = req.params;
        const especialidads = await Especialidades.findById(id);
        if (!especialidads) {
            const error = new Error("ESPECIALIDADE NO EXISTE");
            return res.status(400).json({ msg: error.message, ok: 'si' })
        }
        try {
            await Especialidades.deleteOne()
            res.json({ msg: 'Especialidad eliminado corectamente', ok: "si" })
        } catch (e) {
            console.log(e);
        }
    },

    editar: async(req, res) => {
        const { id } = req.params;
        const especialidad = await Especialidades.findById(id);
        if (!especialidad) {
            const error = new Error("ESPECIALIDADE NO EXISTE");
            return res.status(400).json({ msg: error.message, ok: 'si' })
        }
        especialidad.nombreEspecialidad = req.body.nombreEspecialidad || especialidad.nombreEspecialidad;
        try {
            const especialidadEditada = await especialidad.save();
            res.json({ body: especialidadEditada, ok: "si" })
        } catch (e) {
            console.log(e);
        }

    },

    listarUno: async(req, res) => {
        const { id } = req.params;
        const bucar = await Especialidades.findById(id);

        if (!bucar) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "SI" });
        }
        res.json(bucar);

    }

}

export default especialidadControllers;