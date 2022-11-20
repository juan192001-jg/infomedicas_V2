import mongoose from "mongoose";
const agendaCitaSchema = mongoose.Schema({
    idEspecialidad: { type: mongoose.Schema.Types.ObjectId, ref: "Especialidad", require: true, trim: true },
    idMedico: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", require: true, trim: true },
    idSucursal: { type: mongoose.Schema.Types.ObjectId, ref: "Sucursal", require: true, trim: true },
    idPaciente: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", require: true, trim: true },
    fechaCita: { type: String, require: true, trim: true },
    horaCita: { type: String, require: true, trim: true },
    tipoCita: { type: String, require: true, trim: true },
    numeroConsultorio: { type: Number, require: true, trim: true },
    estadoCita: { type: String, require: true, trim: true }
}, { timestamps: true });
const AgendaCita = mongoose.model("AgendaCita", agendaCitaSchema);
export default AgendaCita;