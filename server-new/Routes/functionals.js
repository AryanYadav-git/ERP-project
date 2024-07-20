require("dotenv").config();
const express = require("express");
const {ERP} = require('../DB/erp');
const { authenticateJwt } = require('../middlewares/authenticate');
const {authDep} = require('../middlewares/authDep');
const { cuttingReceived } = require("../DB/cuttingReceived");
const {FinalReport} = require('../DB/sumupReport');

const router = express.Router();

router.post("/laybase", authenticateJwt, authDep, async (req, res) => {
    try{
        const {jobNo, modelNo, color, cutQty} = req.body.entry;
        const entryJob = await ERP.findOne({jobNo, modelNo, color});
        if(!entryJob) {
            console.log('in not job')
            res.status(400).send({message: 'This job is not active or doesn\'t exist'});
            return;
        }
        console.log(cutQty);
        const baseSizes = cutQty.map(item => item.size);
        const entrySizes = entryJob.sizes.map(item => item.size);

        for (let size of baseSizes) {
            if (!entrySizes.includes(size)) {
                console.log('not size')
                // throw new Error('invalid size');
                res.status(400).send({message: "invalid size"});
                return;
            }
        }
        res.status(200).send({message: 'good to go'});
        

    }catch(e){
        console.log(e);
        res.status(500).send({message: 'Internal server error'})
    }
});

module.exports = router;