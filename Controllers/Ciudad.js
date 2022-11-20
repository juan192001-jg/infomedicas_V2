import Ciudad from '../models/Ciudad.js';

const Ciudades = {
    listar: async(req, res) => {
        const ciudad = await Ciudad.find();
        res.json(ciudad);
    },
    agregar: async(req, res) => {
        const { nombreCiudad } = req.body;
        const existeCiudad = await Ciudad.findOne({ nombreCiudad });
        if (existeCiudad) {
            const error = new Error("LA CIUADA YA EXISTE POR FAVOR INTENTE DE NUEVO");
            return res.status(400).json({ msg: error.message, ok: "NO" });
        }
        try {
            const ciudad = new Ciudad(req.body);
            const ciudadGuardada = await ciudad.save();
            res.json({ body: ciudadGuardada, msg: "Documento creado correctamente.", ok: "SI" });

        } catch (error) {
            console.log(error);
        }
    },
    elimenar: async(req, res) => {
        const { id } = req.params;
        const ciudad = await Ciudad.findById(id);

        if (!ciudad) {
            const error = new Error("Documento no encontrado");
            return res.status(400).json({ msg: error.message, ok: "si" })
        }
        try {
            await ciudad.deleteOne()
            res.json({ msg: "Documento eliminado correctamente.", ok: "SI" });
        } catch (error) {
            console.log(error)
        }
    },
    editar: async(req, res) => {
        const { id } = req.params;

        //validamos si existe el documento por el id
        const ciudad = await Ciudad.findById(id);

        if (!ciudad) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "SI" });
        }

        //recibir los datos del formulario
        ciudad.nombreCiudad = req.body.nombreCiudad || ciudad.nombreCiudad;

        try {
            const ciudadGuardada = await ciudad.save();
            res.json({ body: ciudadGuardada, msg: "Documento actualizado correctamente", ok: "SI" });
        } catch (error) {
            console.log(error);
        }
    },
    listarUno: async(req, res) => {
        const { id } = req.params;
        const ciudad = await Ciudad.findById(id);

        if (!ciudad) {
            const error = new Error("Documento no encontrado.");
            return res.status(404).json({ msg: error.message, ok: "SI" });
        }
        res.json(ciudad);
    }
}

export default Ciudades;