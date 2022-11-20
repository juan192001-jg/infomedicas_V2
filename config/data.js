import mongoose, { connect } from 'mongoose';
const connectionBD = () => {
    const urlconection = String(process.env.MONGO_URL);
    connect(urlconection)
        .then(con => {
            console.log(`Conexion establexida con la base de datos`)
        })
        .catch(error => {
            console.log(`Error al iniciar la base de datos de datos`)
        })

}
export default connectionBD;