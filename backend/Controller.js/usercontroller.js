import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
import {users} from '../Model/Userschema.js'
import bycrypt from 'bcrypt';
const saltRounds = 10;
const SP_KEY = process.env.SUPERSECRETKEY;

export const useregister = {
    register : async(req,res)=>{
        const {username,email,password} = req.body;
    
        try {
            const exisiting_user = await users.findOne({email});
            if(exisiting_user){
                return res.status(406).json('User already existing')
            }
            else{
               await bycrypt.hash(password,saltRounds, async function(error,hashed_password){ 
                    if(error){
                        throw error
                    }
                    const newuser = new users({
                        username,
                        email,
                        password:hashed_password
                    })
        
                   await newuser.save()
                   res.status(200).json({user:newuser, message: 'Registration successfull'})
                })
            }
        } catch (error) {
            res.status(401).json('Error Transaction' , error)
        }
    }
}


// login user
export const userlogin = {
    login : async(req,res)=>{
        const {email,password} = req.body;

        try {
            const existingUser = await users.findOne({ email});
            if(existingUser){
               await bycrypt.compare(password,existingUser.password, function(error, result){
                    if(error){
                        throw error
                    }
                    
                    if(result){
                        const token = jwt.sign({UserId:existingUser._id},SP_KEY)
                        res.status(200).json({user:existingUser,token:token, message: 'login successfull'})
                    }else{
                        res.status(401).json({ message: 'invalid Email or Password'})
                    }
                })
               
            }else{
                res.status(401).json({ message: 'invalid Email or Password'})
            }

        } catch (error) {
            res.status(500).json({message:'internal server error', error: error.message});
        }
    }
}

