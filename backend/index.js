import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import './DB/connection.js'


const app = express();
app.use(express.json());
app.use(cors());


const PORT = 5000;
app.get('/',(req,res)=>{
    res.send('express is running')
})
app.listen(PORT,()=>{
    console.log(`Server listening PORT at : ${PORT}`);
})