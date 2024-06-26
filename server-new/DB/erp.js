const {default: mongoose} = require('mongoose');
// const {connectDBs} = require('../db');


const erpSchema = new mongoose.Schema({
    jobNo : {type: String, required: true, maxLength:10},
    modelNo : {type: String, required: true},
    color : {type: String, required: true},
    sizes:[{
        size: {type: String, required: true},
        sizeQty: {type: Number, required: true},
        estQty: {type: Number, required: true},
    }],
    orderQty : {type: Number, required: true},
    totalEstQty : {type: Number, required: true},
    EstDelDate : {type: String, default: "Not decided yet"},
    exJprDate : {type: String, required: true},
    status: {type: String, required: true}
});

// const { erpDb } = connectDBs()

// module.exports = {
//     Order: erpDb.model('erp', erpSchema),
//     // Qrcode: qrCodeDb.model('Qrcode', qrSchema)
// }

const ERP = new mongoose.model('erp', erpSchema);

module.exports = {ERP};
