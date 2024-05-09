import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'username required']
    },
    email:{
        type: String,
        required: [true, 'email required'],
    },
    password:{
        type: String,
        required : [true, 'password is required']
    }
})
export const users = mongoose.model('users', userSchema);
