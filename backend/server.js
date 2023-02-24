const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.set('strictQuery', true);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//multer has option called disk storage.2 parameters --> destination and file name.
const Storage = multer.diskStorage({
   //creates a folder called uploads and stores the files in it.
    destination:'uploads',
    //cb is the callback.
    filename:(req,file,cb) => {
        //since we could receive multiple files, we are going to store it with the original name.
        cb(null,file.originalname);
    },
});

//Specify the storage as multer storage.
const upload = multer({
    //Specify the storage as our "Storage" that we created.
    storage:Storage
//since we are uploading files one by one, we have to make use of "single".
//we are going to upload images using this name (testImage).
//since we are uploading files one by one, should make use of "single"
}).single('testImage')

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!");
});


/*type here*/

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            //Create a new instance and save the details.
            const newItem = new Item({
                name: req.body.name,
                image:{
                    //shows the filename being added.
                    data:req.file.filename,
                    //type or format of image. Could be jpg,jpeg or png. Doesn't mattrer.
                    contentType:'image/png'
                }
            })
            newItem.save().then(()=>res,send('Successfully uploaded'))
            .catch(err=>console.log)
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});
