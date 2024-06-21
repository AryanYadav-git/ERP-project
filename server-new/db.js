require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
    try{
        mongoose.connect(process.env.DB);
        console.log(`database connected successfully`);
    }catch(e){
        console.log('Error occured in db connection');
    }
}

// const connectDBs = () => {
//     try {
//         const userDB = mongoose.createConnection(process.env.DB);
//         return { erpDb, userDB }
//     } catch (error) {
//         console.error(`Error:${error.message}`)
//         process.exit(1)
//     }
// }

// module.exports = {connectDBs};