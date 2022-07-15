// const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

const connectDB = async () => {
    try{
        
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        console.log("MongoDB connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB