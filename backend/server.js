const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
require("dotenv").config();

const PORT = process.env.PORT || 8070;

//app uses the cors dependency package
app.use(cors());

//app uses the bodyParser package of the json format used by MongoDB
app.use(bodyParser.json());

//can assign the MONGODB_URL directly using the process.env
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


//The server.js should be able to access the "inventories.js" file of the "routes folder."
//The inventories.js file access path is assigned to a variable called "inventoryRouter"
const itemRouter = require("./routes/item_route.js");

//When passing data from frontend to backend, we use a URL and call the backend.(http://localhost:8070/inventory)  
//There's a function called "use" in express.
//Express was initially assigned to a variable called "app"
//This function uses 2 parameters.  When first parameter is called --> it loads the inventories.js file in the routes folder.(Path is assigned to inventoryRouter variable)
app.use("/item",itemRouter);

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
