const router = require("express").Router();
let Item = require("../models/Item");

router.route("/add").post((req, res)=>{
    const productId = req.body.productId;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = Number(req.body.quantity);
    const image = req.body.image;


    const newItem = new Item({
        productId,
        name,
        description,
        price,
        quantity,
        image
    })

    newItem.save().then(()=>{
        res.json("Item Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

//RETRIEVE DETAILS ROUTE.
router.route("/").get((req, res)=>{
    Item.find().then((items)=>{
        res.json(items);
    }).catch((err)=>{
        console.log(err);
    })
})

//DELETE ROUTE.
router.route("/delete/:id").delete(async(req, res)=>{
    let itemId = req.params.id;

    await Item.findByIdAndDelete(itemId).then(()=>{
        res.status(200).send({status: "Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in deleting Item", error: err.message});
    })
})

//RETRIEVEING ONE SPECIFIC DETAIL
router.route("/get/:id").get(async(req,res) =>{
    let itemId = req.params.id;
    const item = await Item.findById(itemId)
    .then(()=>{
        res.status(200).send({status:"Item fetched",item:item})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getting one item",error:err.message});
    })
})

//UPDATE ROUTE
router.route("/update/:id").put(async(req,res)=>{
    let itemId = req.params.id;
    const {productId,name,description,price,quantity,image} = req.body;

    const updateItem = {
        productId,
        name,
        description,
        price,
        quantity,
        image
    }

    const update = await Item.findByIdAndUpdate(itemId,updateItem)
    .then(()=>{
        res.status(200).send({status : "Item Updated",item: update})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});
    })
})

module.exports = router;