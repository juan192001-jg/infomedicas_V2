import Sucursal from "../models/Sucursal.js";
const SucursalController = {
    agregar: async(req, res) => {
        const { nombreSucursal } = req.body;
        const sucursal = await Sucursal.findOne({ nombreSucursal });
        if (sucursal) {
            const error = new Error("El Nombres De la Circusal Ya  Existe");
            return res.status(400).json({ msg: error.message, ok: "si" })
        }
        try {
            const sucursal = new Sucursal(req.body);
            const nuevaSucursal = await sucursal.save();
            res.json({ body: nuevaSucursal, msg: "si" });

        } catch (e) {
            console.log(e);
        }
    },

    listar: async(req, res) => {
        const sucursal = await Sucursal.findOneAndUpdate();
        res.json(sucursal);
        console.log('respuesta desde el metodo listar');
    },

    eliminar: async(req, res) => {
        const { id } = req.params;
        const sucursal = await Sucursal.findById(id);
        if (!sucursal) {
            const error = new Error("Documento no encontrado");
            return res.status(400).json({ msg: error.message, ok: "si" })
        }
        try {
            await sucursal.deleteOne();
            res.json({ msg: "Sucursal eliminado  corectamente" });


        } catch (e) {
            console.log(e);

        }

    },

    editar: async(req, res) => {
        const { id } = req.params;
        const sucursal = await Sucursal.findById(id);
        if (!sucursal) {
            const error = new Error("Documento no encontrado");
            return res.status(400).json({ msg: error.message, ok: "si" })
        }
        sucursal.Ciudad = req.body.Ciudad || sucursal.Ciudad;
        sucursal.nombreSucursal = req.body.nombreSucursal || sucursal.nombreSucursal;

        try {
            const sucursaleditada = await sucursal.save()
            res.json({ body: sucursaleditada, msg: "Sucursal Editada  corectamente", ok: "SI" });


        } catch (e) {
            console.log(e);

        }
    },

    listarUno: async(req, res) => {
        const { id } = req.params;
        const sucursal = await Sucursal.findById(id);
        if (!sucursal) {
            const error = new Error("Documento no encontrado");
            return res.status(404).json({ msg: error.message, ok: "si" })
        }
        res.json(sucursal);
    }
}

export default SucursalController;