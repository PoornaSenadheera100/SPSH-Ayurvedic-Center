const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
//import file system.
const fs = require('fs')
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




const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!");
});




//The server.js should be able to access the "inventories.js" file of the "routes folder."
//The inventories.js file access path is assigned to a variable called "inventoryRouter"
const itemRouter = require("./routes/items.js");

//When passing data from frontend to backend, we use a URL and call the backend.(http://localhost:8070/inventory)  
//There's a function called "use" in express.
//Express was initially assigned to a variable called "app"
//This function uses 2 parameters.  When first parameter is called --> it loads the inventories.js file in the routes folder.(Path is assigned to inventoryRouter variable)
app.use("/item",itemRouter);



app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});
