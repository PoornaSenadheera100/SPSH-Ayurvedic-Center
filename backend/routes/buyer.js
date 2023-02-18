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

module.exports = router;