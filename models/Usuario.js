import mongoose from "mongoose";
import bcrypt from "bcrypt";
const usuarioSchema = mongoose.Schema({
    Ciudad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', require: true },
    nombre: { type: String, require: true, trim: true },
    apellido: { type: String, require: true, trim: true },
    corre: { type: String, require: false, trim: true },
    Tipo_Usuario: { type: String, require: true, trim: true },
    telefono: { type: Number, require: true, trim: true },
    dirrecion: { type: String, require: true, trim: true },
    genero: { type: String, require: true, trim: true },
    tipoDocumento: { type: String, require: true, trim: true },
    numeroDocumento: { type: String, require: true, unique: true, trim: true },
    edad: { type: Number, require: true, trim: true },
    fechaNacimineto: { type: String, require: true, trim: true },
    usuarioAcesso: { type: String, require: true, trim: true, unique: true },
    claveAcceso: { type: String, require: true, trim: true },
    rol: { type: String, require: true, trim: true },
    estados: { type: String, require: true, trim: true }
}, { timestamps: true });
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified("claveAcceso")) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
});
usuarioSchema.methods.comprobarClave = async function(claveFormulario) {
    return await bcrypt.compare(claveFormulario, this.claveAcceso);
}

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;