const {default: mongoose} = require('mongoose');

const CuttingReceivedSchema = mongoose.Schema({
    date: String,
    entries:[{
        orderNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        qty: {type: Number, required: true}
    }]
});

const cuttingReceived = mongoose.model('cuttingReceive', CuttingReceivedSchema);

module.exports = {cuttingReceived};