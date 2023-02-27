const router=require("express").Router();
const {request}=require("express");
let ShoppingCart=require("../models/ShoppingCart");


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

//update a specific cart 

router.route("/shoppingCart/update/:id").put(async(req,res)=> {
    let userId = req.params.id;
    const {buyerEmail,itemID,ProductQty} = req.body;
    const updateShoppingcart ={
        buyerEmail,
        itemID,
        ProductQty
    }
    const update = await ShoppingCart.findByIdAndUpdate(userId,updateShoppingcart).then(()=>{
        res.status(200).send({status:"Cart updated",user:update});
    }).catch((err)=>{
        console.log(err);
        res.status(200).send({status:"Opps! Error in updating the cart"});
    })
  
})

//Delete a specific cart
router.route("/shoppingCart/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await ShoppingCart.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Cart updated",user:update});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

module.exports=router;


