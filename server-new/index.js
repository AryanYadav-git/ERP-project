require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./db');
const adminRouter = require("./Routes/admin");
const erpRouter = require('./Routes/erp');
const cuttingRouter = require('./Routes/cutting');
const productionRouter = require('./Routes/production');
const finalReportRouter = require('./Routes/report');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
try{
    connection();
}
catch(e){
    console.log('Database not connected', e);
};

// Middleware
app.use(express.json());
app.use(helmet());

// Enable CORS for specific origin
app.use(cors({
    origin: "https://cf-dashboard-eight.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
}));

// Enable preflight requests for all routes
app.options('*', cors());

// Debugging middleware to log requests
app.use((req, res, next) => {
    console.log('Request received: ', req.method, req.url);
    next();
});

// Define routes
app.use('/admin', adminRouter);
app.use('/erp', erpRouter);
app.use('/cutting', cuttingRouter);
app.use('/production', productionRouter);
app.use('/report', finalReportRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
