require("dotenv").config();
const express = require("express");
// const {cuttingReports} = require("../DB//cuttingReports")
// const {ERP} = require('../DB/erp');
const { productionReceived, productionReports } =require("../DB/production");
const { authenticateJwt } = require('../middlewares/authenticate');
const {authDep} = require('../middlewares/authDep');
// const { cuttingReceived } = require("../DB/cuttingReceived");
const {FinalReport} = require('../DB/sumupReport');


const router = express.Router();

router.post('/reports', authenticateJwt, authDep, async (req, res) => {
    try{
        const reqDate = req.body.date;
        const {orderNo, modelNo, qty} = req.body.entry;
        // console.log(reqBody);
        const entry = await productionReports.findOne({date: reqDate});
        const record = await FinalReport.findOne({jobNo:`${orderNo}${modelNo}`});
        record.totalProd += Number(qty);
        // console.log(record);
        // console.log(entry);
        if(!entry){
            console.log("in not entry");
            let newArray = [];
            newArray.push(req.body.entry);
            await new productionReports({date: req.body.date, entries:newArray}).save();
            await record.save();
            res.status(200).send({message:'inserted successfully'});
            return;
        }
        await entry.entries.push(req.body.entry);
        await record.save();
        await entry.save();
        res.status(200).send({message:'inserted successfully'});
    }catch(e){
        console.log(e)
        res.status(400).send({message:'error'});
    }
})

router.post('/received', authenticateJwt, authDep, async (req, res) => {
    try{
        const reqDate = req.body.date;
        const {orderNo, modelNo, qty} = req.body.entry;

        // console.log(reqBody);
        const entry = await productionReceived.findOne({date: reqDate});
        const record = await FinalReport.findOne({jobNo:`${orderNo}${modelNo}`});
        record.totalIssue += Number(qty);
        // console.log(entry);
        if(!entry){
            console.log("in not entry")
            let newArray = [];
            newArray.push(req.body.entry);
            await new productionReceived({date: req.body.date, entries:newArray}).save();
            await record.save();
            res.status(200).send({message:'inserted successfully'});
            return;
        }
        await entry.entries.push(req.body.entry);
        await record.save();
        await entry.save();
        res.status(200).send({message:'inserted successfully'});
    }catch(e){
        console.log(e)
        res.status(400).send({message:'error'});
    }
})


router.get('/reports/get', authenticateJwt, async (req, res) => {
    try {
        
        const orders = await productionReports.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

router.get('/received/get', authenticateJwt, async (req, res) => {
    try {
        
        const orders = await productionReceived.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

module.exports = router;