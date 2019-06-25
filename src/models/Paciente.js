const mongoose = require('mongoose');
const { Schema } = mongoose;

const PacienteSchema = new Schema({
    cedula: {type: String, required: true},
    nombres: {type: String, required: true}, 
    apellidos: {type: String, required: true},
    sexo: {type: String, required: true},
    fecha_nacimiento: {type: Date, required: true},
    edad: {type: Number, required: true},
    direccion: {type: String, required: true},
    estado_civil: {type: String, required: true},
    provincia: {type: String, required: true},
    canton: {type: String, required: true},
    parroquia: {type: String, required: true},
    nivel_estudio: {type: String, required: true},
    actv_laboral: {type: String, required: true},
    telefono: {type: String, required: true},
    movil: {type: String, required: true},
    long: {type: Number, required: true},
    lat: {type: Number, required: true},
    user: { type: String}
});

module.exports = mongoose.model('Paciente', PacienteSchema)