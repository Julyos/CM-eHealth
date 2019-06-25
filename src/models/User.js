const mongoose = require('mongoose');
const { Schema } = mongoose;
const brcryt = require('bcryptjs');

const UserSchema = new Schema({
    usuario: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await brcryt.genSalt(10);
    const hash = brcryt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password){
    return await brcryt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)