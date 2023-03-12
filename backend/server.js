const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
//import file system.
const fs = require('fs');
require("dotenv").config();

const PORT = process.env.PORT || 8070;

//app uses the cors dependency package
app.use(cors());

//app uses the bodyParser package of the json format used by MongoDB
app.use(bodyParser.json());

//can assign the MONGODB_URL directly using the process.env
const URL = process.env.MONGODB_URL;

mongoose.set('strictQuery', true);

mongoose.set('strictQuery', true);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//multer has option called disk storage.2 parameters --> destination and file name.
//First we save the images in the computer, and then move it to MongoDB
const storage = multer.diskStorage({
   //creates a folder called uploads and stores the files in it.
    destination:(req,file,cb)=>{
    //cb is the callback.
    cb(null,'uploads')
    },
    filename:(req,file,cb) => {
        //since we could receive multiple files, we are going to store it with the original name.
        cb(null,file.originalname);
    },
});

//Specify the storage as multer storage.
const upload = multer({
    //Specify the storage as our "Storage" that we created.
    storage:storage
//since we are uploading files one by one, we have to make use of "single".
//we are going to upload images using this name (testImage).
//since we are uploading files one by one, should make use of "single"
})

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!");
});

const ShoppingCartRouter = require("./routes/shoppingCarts.js");
app.use("/ShoppingCart",ShoppingCartRouter);


const buyerRouter = require("./routes/buyer.js");
app.use("/buyer", buyerRouter);

const adminRouter = require("./routes/admin.js");
app.use("/admin", adminRouter);

const sellerRouter = require("./routes/seller.js");
app.use("/seller", sellerRouter);

;

/*
app.post('/',upload.single('Image'),(req,res)=>{
    const saveImage = new Item({
        name: req.body.name,
        image:{
            data: fs.readFileSync('uploads/',req.file.filename),
            contentType:"image/png"
        },
    });
    saveImage.save()
    .then((res)=>console.log('Image is saved'))
    .catch((err)=>{
        console.log(err,"error has occured");
    });
});
*/

//The server.js should be able to access the "inventories.js" file of the "routes folder."
//The inventories.js file access path is assigned to a variable called "inventoryRouter"
const itemRouter = require("./routes/items.js");

//When passing data from frontend to backend, we use a URL and call the backend.(http://localhost:8070/inventory)  
//There's a function called "use" in express.
//Express was initially assigned to a variable called "app"
//This function uses 2 parameters.  When first parameter is called --> it loads the inventories.js file in the routes folder.(Path is assigned to inventoryRouter variable)
app.use("/item",itemRouter);



const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
    to: 'poornasenadheeraonline@gmail.com', // Change to your recipient
    from: 'admin@spsh.lk', // Change to your verified sender
    subject: 'Registration Successfull',
    text: 'This is Text',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail.send(msg).then(() => {
    console.log('Email sent')
}).catch((error) => {
    console.error(error)
})



app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});

