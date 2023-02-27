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

//Read a specific cart items
router.route("/retrieve/:buyerEmail").get(async(req,res)=>{
    let buyerEmail = req.params.buyerEmail;
    
    const retrieve = await ShoppingCart.find({"buyerEmail": buyerEmail}).then((cart)=>{
        res.json(cart);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Opps! Error in loading the cart items"});
    })
})

//update a specific cart 

router.route("/update/:cid/:iid").put(async(req,res)=> {
    let cartId = req.params.buyerEmail;
    let itemID = req.params.itemID;

    const {ProductQty} = req.body;
    const updateShoppingcart ={
        ProductQty
    }
    const update = await ShoppingCart.findOneAndUpdate({"buyerEmail": `${cartId}`}, {"itemID": `${itemID}`}, updateShoppingcart).then(()=>{
        console.log(ProductQty);
        res.status(200).send({status:"Cart updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(200).send({status:"Opps! Error in updating the cart"});
    })
  
})

//Delete a specific cart
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await ShoppingCart.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Cart deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error in deleting cart",error:err.message});
    })
})

module.exports=router;


