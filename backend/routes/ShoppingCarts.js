const router=require("express").Router();
const {request}=require("express");
let ShoppingCart=require("../models/ShoppingCarts");


//Data insertion
router.route("/add").post((req,res)=>{

//have to put the variables 

const newShoppingCart = new ShoppingCart({
    //put the defined variables 
})

newShoppingCart.save().then(()=>{
    res.json("Item Added")
}).catch((err)=>{
    console.log(err);
    })
})

//Read all the Items of shoppingCarts from the database
router.route("/").get((req,res)=>{
    Leave.find().then((ShoppingCart)=>{
        res.json(ShoppingCart)
    }).catch((err)=>{
        console.log(err)
    })
})



module.exports=router;


