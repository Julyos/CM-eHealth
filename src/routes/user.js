const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require ('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/pacientes/add',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {usuario, email, password, confirm_password} = req.body;
    const errors = [];
    if (usuario.length <= 0){
        errors.push({text: 'Por favor inserte un usuario'});
    }
    if (password != confirm_password){
        errors.push({text: 'La contraseña no coincide'});
    }
    if (password.length < 5){
        errors.push({text: 'La contraseña debe tener al menos 5 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, usuario, email, password, confirm_password});
    }else{
       const nameUser = await User.findOne({usuario: usuario});
       if(nameUser){
           req.flash('success_msg', 'El usuario ya existe');
           res.redirect('/users/signup');
       }else{
       const newUser = new User({usuario, email, password});
       newUser.password = await newUser.encryptPassword(password);
       await newUser.save();
       req.flash('success_msg', 'Usuario registrado');
       res.redirect('/users/signin');}
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;