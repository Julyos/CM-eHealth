const express = require('express');
const router = express.Router();

const Paciente = require('../models/Paciente');
const { isAuthenticated } = require('../helpers/auth');

router.get('/pacientes/add', isAuthenticated, (req, res) =>{
    res.render('pacientes/new-paciente');
});

router.post('/pacientes/new-paciente', isAuthenticated, async (req, res) =>{
    const { cedula, nombres, apellidos, sexo, fecha_nacimiento, edad, direccion, 
        estado_civil, provincia, canton, parroquia, nivel_estudio, actv_laboral, telefono, movil, long, lat } = req.body;
    const errors = [];
    if (!cedula){
        errors.push({text: 'Por favor ingrese la cedula del paciente'});
    }
    if(errors.length > 0){
        res.render('pacientes/new-paciente',{
            errors,
            cedula
        });
    } else {
        const newPaciente = new Paciente({ cedula, nombres, apellidos, sexo, fecha_nacimiento, edad, direccion, estado_civil, provincia, canton, parroquia, nivel_estudio, actv_laboral, telefono, movil, long, lat });
        newPaciente.user = req.user.id;
        await newPaciente.save();
        req.flash('success_msg', 'Paciente añadido satisfactoriamente');
        res.redirect('/pacientes')
    }
});

router.get('/pacientes', isAuthenticated, async (req, res) => {
    const pacientes = await Paciente.find({user: req.user.id}).sort({apellidos: 1});
    res.render('pacientes/all-pacientes', { pacientes });
});

router.get('/pacientes/edit/:id', isAuthenticated, async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    res.render('pacientes/edit-paciente', { paciente });
});

router.put('/pacientes/edit-paciente/:id', isAuthenticated, async (req, res) => {
    const { cedula, nombres, apellidos, sexo, fecha_nacimiento, edad, direccion, estado_civil, provincia, canton, parroquia, nivel_estudio, actv_laboral, telefono, movil, long, lat }= req.body;
    await Paciente.findByIdAndUpdate(req.params.id, { cedula, nombres, apellidos, sexo, fecha_nacimiento, edad, direccion, estado_civil, provincia, canton, parroquia, nivel_estudio, actv_laboral, telefono, movil, long, lat });
    req.flash('success_msg', 'Paciente actualizado satisfactoriamente');
    res.redirect('/pacientes');
});
router.delete('/pacientes/delete/:id', isAuthenticated, async (req, res) => {
    await Paciente.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Paciente eliminado satisfactoriamente');
    res.redirect('/pacientes');
});

module.exports = router;