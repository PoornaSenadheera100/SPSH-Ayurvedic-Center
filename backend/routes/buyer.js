const router = require("express").Router();
let Buyer = require("../models/Buyer");

router.route("/add").post((req, res)=>{
    const name = req.body.name;
    const address = req.body.address;
    const nic = req.body.nic;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;


    const newBuyer = new Buyer({
        name,
        address,
        nic,
        email,
        phone,
        password
    })

    newBuyer.save().then(()=>{
        res.json("Buyer Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{
    Buyer.find().then((buyer)=>{
        res.json(buyer);
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/delete/:id").delete(async(req, res)=>{
    let buyerId = req.params.id;

    await Buyer.findByIdAndDelete(buyerId).then(()=>{
        res.status(200).send({status: "Buyer Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Buyer", error: err.message});
    })
})

router.route("/get/:id").get(async(req, res)=>{
    let buyerId = req.params.id;
    const buyer = await Buyer.findById(buyerId).then((buyer)=>{
        res.status(200).send({status: "Buyer fetched", buyer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get buyer", error: err.message});
    })
})

module.exports = router;