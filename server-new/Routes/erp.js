const express = require('express');
const router = express.Router();
const {ERP} = require('../DB/erp');
const { authenticateJwt } = require('../middlewares/authenticate');
const {authDep} = require('../middlewares/authDep');

router.post('/',authenticateJwt, authDep, async(req, res) => {
    try{
        const reqOrder = req.body.order;
        console.log(reqOrder);
        const order = await ERP.findOne({jobNo: reqOrder.jobNo, color: reqOrder.color, EstDelDate: reqOrder.EstDelDate});
        console.log("1");
        if(order){
            res.status(400).send({message: 'order already exists'});
            return;
        }else{
            let OrderQty = 0;
            let totalEstQty = 0;
            reqOrder.sizes.map((item) => {
                // console.log(item);
                OrderQty += Number(item.sizeQty);
                totalEstQty += Number(item.estQty);
            });
            // console.log(OrderQty);
            await new ERP({...req.body.order, orderQty:OrderQty, totalEstQty}).save();
            res.status(200).send({ message: "New order created successfully" });
            return;
        }
    }catch(e){
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
});

// router.get('/get', authenticateJwt, async(req, res) => {
//     const orders = await Order.find({});
//     res.json( orders );
// });

router.get('/get', authenticateJwt, async (req, res) => {
    try {
        const orders = await ERP.find({}).select('-__v').sort({'delDate': 1});
        const active = await ERP.find({status:'Active'}).select('-__v').sort({'delDate': 1});
        res.json({orders, active});
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

module.exports = router;