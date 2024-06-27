const {default: mongoose} = require('mongoose');

const ProductionReceivedSchema = mongoose.Schema({
    date: String,
    entries:[{
        jobNo: {type: String, required: true, maxLength:10},        
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        layer: {type: Number, required: true},
        lineNo: {type: Number, required: true},
        size: {type: String, required: true},
        qty: {type: Number, required: true}
    }]
});

const ProductionReportsSchema = mongoose.Schema({
    date: String,
    entries:[{
        jobNo: {type: String, required: true, maxLength:10},        
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