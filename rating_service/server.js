const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.json());

const PORT = 8071;

app.use(cors());

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

const rateRouter = require("./routes/rate.js");
app.use("/rate", rateRouter);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});