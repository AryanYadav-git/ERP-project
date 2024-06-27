require('dotenv').config();
const express = require('express');
const router = express.Router();
const {ERP} = require('../DB/erp');
const {Ironing, Packing, FinishingReceived} = require('../DB/finishingMain');
const {FinalReport} = require('../DB/sumupReport');
const { authenticateJwt } = require('../middlewares/authenticate');
const {authDep} = require('../middlewares/authDep');

router.post('/received', authenticateJwt, authDep, async (req, res) => {
    try{
        const reqDate = req.body.date;
        const {jobNo, modelNo, qty} = req.body.entry;

        // console.log(reqBody);
        const entry = await FinishingReceived.findOne({date: reqDate});
        const record = await FinalReport.findOne({jobNo:`${jobNo}${modelNo}`});
        console.log(record);
        record.dispatchToFinishing += Number(qty);
        // console.log(entry);
        if(!entry){
            console.log("in not entry")
            let newArray = [];
            newArray.push(req.body.entry);
            await new FinishingReceived({date: req.body.date, entries:newArray}).save();
            await record.save();
            res.status(200).send({message:'inserted successfully'});
            return;
        }
        await entry.entries.push(req.body.entry);
        await record.save();
        await entry.save();
        res.status(200).send({message:'Inserted successfully'});
    }catch(e){
        console.log(e)
        res.status(400).send({message:'error'});
    }
})

router.get('/received/get', authenticateJwt, async (req, res) => {
    try { 
        const orders = await FinishingReceived.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});


router.post('/ironing/reports', authenticateJwt, authDep, async (req, res) => {
    try{
        const reqDate = req.body.date;
        const {jobNo, modelNo} = req.body.entry;
        let {qty} = req.body.entry;
        const reqOrder = await ERP.findOne({jobNo, modelNo});
        const finalRecord = await FinalReport.findOne({jobNo: `${jobNo}${modelNo}`});
        const entry = await Ironing.findOne({date: reqDate});
        let totalIron = finalRecord.totalIron;
        console.log(totalIron);
        const sizes = reqOrder.sizes;
        // console.log(sizes);
        let i = 0;
        let sizeQtyYet = sizes[0].sizeQty;
        finalRecord.totalIron += Number(qty);
        while(totalIron >= sizeQtyYet){
            i++;
            sizeQtyYet += sizes[i].sizeQty;    
        }
        while(qty>0){
            if(qty <= sizeQtyYet-totalIron){
                let newArray = [];
                let toEntry = {...req.body.entry,  size:sizes[i].size, qty};
                console.log(toEntry);
                newArray.push(toEntry);
                if(!entry){
                    await new Ironing({date:reqDate, entries:newArray}).save();
                }else{
                    entry.entries.push(toEntry);
                    await entry.save();
                }
                qty = 0;
            }else{
                let newArray = [];
                let toEntry = {...req.body.entry,  size:sizes[i].size, qty: sizeQtyYet-totalIron};
                console.log(toEntry);
                newArray.push(toEntry);
                if(!entry){
                    await new Ironing({date:reqDate, entries:newArray}).save();
                }else{
                    entry.entries.push(toEntry);
                    await entry.save();
                }
                qty = qty-(sizeQtyYet-totalIron);
                totalIron = sizeQtyYet;
                i++;
                sizeQtyYet += sizes[i].sizeQty;
            }
        }
        finalRecord.save();
        res.status(200).send({message: 'Done'});
    }catch(e){
        console.log(e)
        res.status(500).send({message: 'Internal server error'})
    }
    
});

router.get('/ironing/get', authenticateJwt, async (req, res) => {
    try {
        const orders = await Ironing.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

router.post('/packing/reports', authenticateJwt, authDep, async (req, res) => {
    try{
        const reqDate = req.body.date;
        const {jobNo, modelNo} = req.body.entry;
        let {qty} = req.body.entry;
        const reqOrder = await ERP.findOne({jobNo, modelNo});
        const finalRecord = await FinalReport.findOne({jobNo: `${jobNo}${modelNo}`});
        const entry = await Packing.findOne({date: reqDate});
        let totalPack = finalRecord.totalPacking;
        console.log(totalPack);
        const sizes = reqOrder.sizes;
        // console.log(sizes);
        let i = 0;
        let sizeQtyYet = sizes[0].sizeQty;
        finalRecord.totalPacking += Number(qty);
        while(totalPack >= sizeQtyYet){
            i++;
            sizeQtyYet += sizes[i].sizeQty;    
        }
        while(qty>0){
            if(qty <= sizeQtyYet-totalPack){
                let newArray = [];
                let toEntry = {...req.body.entry,  size:sizes[i].size, qty};
                console.log(toEntry);
                newArray.push(toEntry);
                if(!entry){
                    await new Packing({date:reqDate, entries:newArray}).save();
                }else{
                    entry.entries.push(toEntry);
                    await entry.save();
                }
                qty = 0;
            }else{
                let newArray = [];
                let toEntry = {...req.body.entry,  size:sizes[i].size, qty: sizeQtyYet-totalPack};
                console.log(toEntry);
                newArray.push(toEntry);
                if(!entry){
                    await new Packing({date:reqDate, entries:newArray}).save();
                }else{
                    entry.entries.push(toEntry);
                    await entry.save();
                }
                qty = qty-(sizeQtyYet-totalPack);
                totalPack = sizeQtyYet;
                i++;
                sizeQtyYet += sizes[i].sizeQty;
            }
        }
        finalRecord.save();
        res.status(200).send({message: 'Done'});
    }catch(e){
        console.log(e)
        res.status(500).send({message: 'Internal server error'})
    }
    
});

router.get('/packing/get', authenticateJwt, async (req, res) => {
    try {
        const orders = await Packing.find({}).select('-__v').sort({'date': -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});



module.exports = router;