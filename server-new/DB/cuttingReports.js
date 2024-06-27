const {default: mongoose} = require('mongoose');

const CuttingReportsSchema = mongoose.Schema({
    date: String,
    entries:[{
        jobNo: {type: Number, required: true},
        modelNo: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        layer: {type: Number, required: true},
        qty: {type: Number, required: true}
    }]
});

const cuttingReports = mongoose.model('cuttingReports', CuttingReportsSchema);

module.exports = {cuttingReports};