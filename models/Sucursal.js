import mongoose from "mongoose";

const sucursalSchema = mongoose.Schema({
    Ciudad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', require: true },
    nombreSucursal: { type: String, require: true, trim: true, unique: true },
    dirrecion: { type: String, require: true, trim: true, unique: true }
}, {
    timestamps: true
});
const Sucursal = mongoose.model("Sucursal", sucursalSchema);
export default Sucursal;