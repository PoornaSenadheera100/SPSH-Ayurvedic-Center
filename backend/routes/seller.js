const router = require("express").Router();
let Seller = require("../models/Seller");

router.route("/add").post((req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;


    const newSeller = new Seller({
        name,
        email,
        phone,
        password
    })

    newSeller.save().then(()=>{
        res.json("Seller Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{
    Seller.find().then((seller)=>{
        res.json(seller);
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;