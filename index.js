import express from 'express';
import mongoose from 'mongoose';
import User from './schema.js';

const app = express();
app.use(express.json());
const PORT =8080;

import dotenv from 'dotenv';
dotenv.config();

app.get('/',(req,res)=>{
    res.send('pong')
});

app.get('/get', async(req,res)=>{
   try {
    const users = await User.find();
    res.json(users)
   } catch (error) {
    return res.status(500).json({message:error.message})
   }
});

app.post('/post',async(req,res)=>{
    const{name,age,passion}=req.body;
    const newUser = new User({
        name,
        age,
        passion
    });
    try {
        const savedUser = await User.save();
        res.json(savedUser)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
});




app.put('/put/:id', async(req,res)=>{
    const{name,age,passion}=req.body;

    const id = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(id,{name,age,passion},{new:true});
        if(user){
            res.json(user)
        }else{
            res.status(404).json({message:"User not found",err})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        res.status(200).send('The user is deleted successfully');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
await mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Database is connected successfully");
}).catch((err)=>{
    console.log(object)
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})