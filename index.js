import express from "express";
import dotenv from 'dotenv';
import connectionBD from "./config/data.js";
import Usuariosrotes from ".//Routes/Usuarios.js";
import CiudadRoter from "./Routes/Ciudad.js";
import Especialidad from "./Routes/Especialidad.js";
import Sucursal from "./Routes/Sucursal.js";
import citas from "./Routes/Angendar_citas.js";
const app = express();
app.use(express.json())
    // servidor 
dotenv.config();
connectionBD();

// Rutas 
app.use("/api/usuarios", Usuariosrotes);
app.use("/api/ciudad", CiudadRoter);
app.use("/api/especilidad", Especialidad);
app.use("/api/sucursal", Sucursal);
app.use("/api/citas", citas);



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor coriendo en puesto ${port}`)
})