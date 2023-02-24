const router = require("express").Router();
let Seller = require("../models/Item");

router.route("/add").post((req, res)=>{
    const productId = req.body.productId;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.body.image;


    const newItem = new Item({
        productId,
        name,
        description,
        quantity,
        image
    })

    newItem.save().then(()=>{
        res.json("Item Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{
    Item.find().then((item)=>{
        res.json(item);
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/delete/:id").delete(async(req, res)=>{
    let itemId = req.params.id;

    await Item.findByIdAndDelete(itemId).then(()=>{
        res.status(200).send({status: "Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error ", error: err.message});
    })
})

router.route("/get/:id").get(async(req, res)=>{
    let itemId = req.params.id;
    const item = await Item.findById(itemId).then((item)=>{
        res.status(200).send({status: "Item retrieved", item})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error", error: err.message});
    })
})


module.exports = router;