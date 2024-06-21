const {default: mongoose} = require('mongoose');
// const {connectDBs} = require('../db');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required:true},
    department: {type: String, required: true},
});


// module.exports = {
//     Admin: userDB.model('user', userSchema),
//     // Qrcode: qrCodeDb.model('Qrcode', qrSchema)
// }

const Admin = mongoose.model('user', userSchema);

module.exports = {Admin};