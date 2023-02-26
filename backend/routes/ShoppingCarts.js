const router=require("express").Router();
const {request}=require("express");
let ShoppingCart=require("../models/ShoppingCarts");


//Data insertion
router.route("/add").post((req,res)=>{

    const buyerEmail = req.body.buyerEmail;
    const itemID = req.body.itemID;
    const ProductQty = req.body.ProductQty

const newShoppingCart = new ShoppingCart({
    buyerEmail,
    itemID,
    ProductQty
})

newShoppingCart.save().then(()=>{
    res.json("Item Added")
}).catch((err)=>{
    console.log(err);
    })
})

//http://localhost:8070/ShoppingCart
//Read all the Items of shoppingCarts from the database
router.route("/").get((req,res)=>{
    ShoppingCart.find().then((ShoppingCart)=>{
        res.json(ShoppingCart)
    }).catch((err)=>{
        console.log(err)
    })
})

//update 
router.route("/update/:id").put(async(req,res)=> {
    let userId = req.params.id;
})


module.exports=router;


