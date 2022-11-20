import mongoose from "mongoose";

const ciudadSchema = mongoose.Schema({
    nombreCiudad: { type: String, require: true, trim: true, unique: true },
}, { timestamps: true });
const Ciudad = mongoose.model("Ciudad", ciudadSchema);
export default Ciudad;