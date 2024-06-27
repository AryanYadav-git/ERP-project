const {default: mongoose} = require('mongoose');

const finishingReceivedSchema = mongoose.Schema({
    date: String,
    entries:[{
        jobNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        qty: {type: Number, required: true},
    }]
}) 

const totalIronSchema = mongoose.Schema({
    date: String,
    entries:[{
        jobNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        qty: {type: Number, required: true},
    }]
});

const totalPackingSchema = mongoose.Schema({
    date: String,
    entries:[{
        jobNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        qty: {type: Number, required: true},
    }]
});

const Ironing = mongoose.model('ironing', totalIronSchema);
const Packing = mongoose.model('packing', totalPackingSchema);
const FinishingReceived = mongoose.model('finishingReceived', finishingReceivedSchema);

module.exports = {Ironing, Packing, FinishingReceived};