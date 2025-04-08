const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema")

const app = express();
app.use(express.json());
const PORT =8080;
const dotenv = require("dotenv")
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
        const savedUser = await newUser.save();
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
  
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`)
    })
    console.log("Database is connected successfully");
}).catch((err)=>{
    console.log(object)
})

