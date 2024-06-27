require("dotenv").config();
const express = require("express");
const {cuttingReports} = require("../DB/cuttingReports")
const {ERP} = require('../DB/erp');
const { authenticateJwt } = require('../middlewares/authenticate');
const {authDep} = require('../middlewares/authDep');
const { cuttingReceived } = require("../DB/cuttingReceived");
const {FinalReport} = require('../DB/sumupReport');

const router = express.Router();

router.post('/reports', authenticateJwt, authDep, async (req, res) => {
    try{
        const reqDate = req.body.date;
        // console.log(reqBody);
        const {jobNo, modelNo, qty} = req.body.entry;
        const entry = await cuttingReports.findOne({date: reqDate});
        const record = await FinalReport.findOne({jobNo:`${jobNo}${modelNo}`});
        console.log(record);
        record.totalCut += Number(qty);
        // console.log(typeof(record.totalCut), typeof(qty));
        // console.log(entry);
        if(!entry){
            console.log("in not entry")
            let newArray = [];
            newArray.push(req.body.entry);
            await new cuttingReports({date: req.body.date, entries:newArray}).save();
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
        // console.log(reqBody);
        const entry = await cuttingReceived.findOne({date: reqDate});
        // console.log(entry);
        if(!entry){
            console.log("in not entry");
            let newArray = [];
            newArray.push(req.body.entry);
            await new cuttingReceived({date: req.body.date, entries:newArray}).save();
            res.status(200).send({message:'inserted successfully'});
            return;
        }
        await entry.entries.push(req.body.entry);
        await entry.save();
        res.status(200).send({message:'inserted successfully'});
    }catch(e){
        console.log(e)
        res.status(400).send({message:'error'});
    }
})


router.get('/reports/get', authenticateJwt, async (req, res) => {
    try {
        
        const orders = await cuttingReports.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

router.get('/received/get', authenticateJwt, async (req, res) => {
    try {
        
        const orders = await cuttingReceived.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

router.post('/update-active', authenticateJwt, authDep, async (req, res) => {
    try {
      const entryId = req.body.id;
      console.log(entryId);
      const entry = await ERP.findOne({ _id: entryId });
      console.log(entry);
      if (!entry) {
        console.log("in not entry")
        res.status(404).send({ message: "unable to update" });
        return;
      }
      if(entry.status == 'Active'){
        res.status(300).send({message: 'entry already activated'});
        return;
      }
      console.log("with entry");
      const {jobNo, modelNo, color, orderQty, totalEstQty} = entry;
      console.log(jobNo, modelNo, color, orderQty);
      await new FinalReport({jobNo:`${jobNo}${modelNo}`, color:color, orderQty: orderQty, estQty:totalEstQty}).save();
      entry.status = "Active";
      await entry.save();
      res.status(200).send({ message: "Activated" });
    } catch (e) {
        res.status(500).send({message: "Internal server error"});
        console.log(e);
    }
})

module.exports = router;