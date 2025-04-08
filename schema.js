import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    passion:{
        type:String,
        requires:true,
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User