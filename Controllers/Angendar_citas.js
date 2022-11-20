import AgendaCita from "../models/Angendar_citas.js";

const AgendarcitaControllers = {
    agregar: async(req, res) => {
        const cita = new AgendaCita(req.body);
        const citasGuardadas = await cita.save();
        return res.status(200).json({ body: citasGuardadas, msg: "Ciata Guandada Corectamente", ok: "si" });

    },

    listar: async(req, res) => {
        const cita = await AgendaCita.find();
        res.json(cita);

    },

    eliminar: async(req, res) => {
        const { id } = req.params;
        const citas = await AgendaCita.findById(id);

        if (!citas) {
            const error = new Error("Cita no encontrado");
            return res.status(400).json({ msg: error.message, ok: "si" })
        }
        try {
            await citas.deleteOne()
            res.json({ msg: "Cita eliminado correctamente.", ok: "SI" });
        } catch (error) {
            console.log(error)
        }
    },

    editar: async(req, res) => {
        const { id } = req.params;
        const citas = await AgendaCita.findById(id);
        if (!citas) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "SI" });
        }
        citas.idEspecialidad = req.body.idEspecialidad || citas.idEspecialidad;
        citas.idMedico = req.body.idMedico || citas.idMedico;
        citas.idSucursal = req.body.idSucursal || citas.idSucursal;
        citas.idPaciente = req.body.idPaciente || citas.idPaciente;
        citas.horaCita = req.body.horaCita || citas.horaCita;
        citas.tipoCita = req.body.tipoCita || citas.tipoCita;
        citas.numeroConsultorio = req.body.numeroConsultorio || citas.numeroConsultorio;
        citas.estadoCita = req.body.estadoCita || citas.estadoCita;
        try {
            const citaseditada = await citas.save();
            res.json({ body: citaseditada, msg: "Documento actualizado correctamente", ok: "SI" });
        } catch (error) {
            console.log(error);
        }
    },

    listarUno: async(req, res) => {
        const { id } = req.params;
        const citas = await AgendaCita.findById(id);

        if (!citas) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "SI" });
        }
        res.json(citas);
    }
}
export default AgendarcitaControllers