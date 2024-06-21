const {default: mongoose} = require('mongoose');

const ProductionReceivedSchema = mongoose.Schema({
    date: String,
    entries:[{
        orderNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        qty: {type: Number, required: true}
    }]
});

const ProductionReportsSchema = mongoose.Schema({
    date: String,
    entries:[{
        orderNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        // layer: {type: Number, required: true},
        lineNo: {type: Number, required: true},
        qty: {type: Number, required: true}
    }]
});

const productionReceived = mongoose.model('productionReceive', ProductionReceivedSchema);
const productionReports = mongoose.model('productionReports', ProductionReportsSchema);

module.exports = {productionReceived, productionReports};