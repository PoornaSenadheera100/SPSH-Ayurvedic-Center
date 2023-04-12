const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.json());

const PORT = 8072;

app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});