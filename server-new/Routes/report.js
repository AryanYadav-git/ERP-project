require("dotenv").config();
const express = require("express");
const {authenticateJwt} = require('../middlewares/authenticate');
const {FinalReport} = require('../DB/sumupReport');

const router = express.Router();

router.get('/', authenticateJwt, async (req, res) => {
    try {
        const orders = await FinalReport.find({}).select('-__v');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
});

module.exports = router;