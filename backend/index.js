import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './Router/router.js'
import './DB/connection.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use('/uploads', express.static('./uploads'));

const PORT = 5000;
app.get('/',(req,res)=>{
    res.send('express is running')
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something went wrong')
})
app.listen(PORT,()=>{
    console.log(`Server listening PORT at : ${PORT}`);
})