require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./db');
const adminRouter = require("./Routes/admin");
const erpRouter = require('./Routes/erp');
const cuttingRouter = require('./Routes/cutting')
const productionRouter = require('./Routes/production');
const finalReportRouter = require('./Routes/report');

const app = express();
const port = process.env.PORT;

try{
    connection();
    console.log("Database connected Successfully");
}catch(e){
    console.log('database not connected', e);
}

app.use(express.json());
app.options('*', cors()); // Enable preflight requests for all routes

app.use(cors(
    {
    origin: ["https://cf-dashboard-eight.vercel.app"],
    methods: ["POST","GET"],
    credentials: true,
}
));

app.use(helmet());

app.use('/admin',adminRouter);
app.use('/erp',erpRouter);
app.use('/cutting', cuttingRouter);
app.use('/production', productionRouter);
app.use('/report', finalReportRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
