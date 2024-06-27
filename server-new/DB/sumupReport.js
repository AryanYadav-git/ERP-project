const {default: mongoose} = require('mongoose');

const reportSchema = mongoose.Schema({
    jobNo: {type: String, required: true},
    color: {type: String, required: true},
    orderQty: {type: Number, required: true},
    estQty: {type: Number, required: true},
    totalCut: {type: Number, default: 0},
    totalIssue: {type: Number, default: 0},
    totalProd: {type: Number, default: 0},
    dispatchToFinishing: {type: Number, default: 0},
    totalIron: {type: Number, default: 0},
    totalPacking: {type: Number, default: 0},
});

const FinalReport = mongoose.model('finalReport', reportSchema);

module.exports = {FinalReport};