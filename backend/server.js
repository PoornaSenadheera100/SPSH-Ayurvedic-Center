const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
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






app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});
