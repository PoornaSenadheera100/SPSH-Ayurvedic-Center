const router = require("express").Router();
let Buyer = require("../models/Buyer");
let Item = require("../models/Item");

// Add new buyer
router.route("/add").post((req, res)=>{
    const name = req.body.name;
    const address = req.body.address;
    const nic = req.body.nic;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

// Creating a new Buyer object with extracted details
    const newBuyer = new Buyer({
        name,
        address,
        nic,
        email,
        phone,
        password
    })

    // Saving the new Buyer object in the database
    newBuyer.save().then(()=>{
        res.json("Buyer Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

// Get all buyers
router.route("/").get((req, res)=>{
    Buyer.find().then((buyer)=>{
        res.json(buyer);
    }).catch((err)=>{
        console.log(err);
    })
})

// Delete buyer by ID
router.route("/delete/:id").delete(async(req, res)=>{
    let buyerId = req.params.id;

    await Buyer.findByIdAndDelete(buyerId).then(()=>{
        res.status(200).send({status: "Buyer Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Buyer", error: err.message});
    })
})

// Get buyer by ID
router.route("/get/:id").get(async(req, res)=>{
    let buyerId = req.params.id;
    const buyer = await Buyer.findById(buyerId).then((buyer)=>{
        res.status(200).send({status: "Buyer fetched", buyer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get buyer", error: err.message});
    })
})

// Get buyer by email
router.route("/get/email/:email").get(async(req, res)=>{
    let email = req.params.email;
    await Buyer.find({"email": `${email}`}).then((buyer)=>{
        res.json(buyer);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get the buyer", error: err.message});
    })
})

// Update buyer details by email
router.route("/update/:paramemail").put(async(req, res)=>{
    let paramemail = req.params.paramemail;
    const {name, address, nic, email, phone, password} = req.body;
    const updateBuyer = {
        name,
        address,
        nic,
        email,
        phone,
        password
    }

    await Buyer.findOneAndUpdate({"email" : paramemail}, updateBuyer).then(()=>{
        res.status(200).send({status: "Buyer Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating the buyer", error: err.message});
    })
})

// Delete buyer by email
router.route("/delete/email/:paraemail").delete(async(req, res)=>{
    let buyerEmail = req.params.paraemail;

    await Buyer.findOneAndDelete({"email" : buyerEmail}).then(()=>{
        res.status(200).send({status: "Buyer Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Buyer", error: err.message});
    })
})


//Get single item's details
router.route("/get/item/:id").get(async(req,res) =>{
    let productID = req.params.id;
    const item = await Item.findOne({"ProductId":`${productID}`})
    .then((item)=>{
        res.status(200).send({status:"Item fetched",item})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getting one item",error:err.message});
    })
})

module.exports = router;