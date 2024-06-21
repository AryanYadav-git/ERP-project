const {default: mongoose} = require('mongoose');
// const {connectDBs} = require('../db');


const erpSchema = new mongoose.Schema({
    orderNo : {type: Number, required: true},
    modelNo : {type: String, required: true},
    color : {type: String, required:true},
    totalQty : {type: Number, required:true},
    delDate : {type: String, required: true},
    exJprDate : {type: String, required: true},
    status: {type:String, required: true}
});

// const { erpDb } = connectDBs()

// module.exports = {
//     Order: erpDb.model('erp', erpSchema),
//     // Qrcode: qrCodeDb.model('Qrcode', qrSchema)
// }

const ERP = new mongoose.model('erp', erpSchema);

module.exports = {ERP};
