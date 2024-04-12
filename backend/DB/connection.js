import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectionstring = process.env.DATABASE;

mongoose.connect(connectionstring).then(()=>{
    console.log(`MongoDB connected successfully`);
}).catch(err =>{
    console.log(`${err} Mongo connection failed`);
})