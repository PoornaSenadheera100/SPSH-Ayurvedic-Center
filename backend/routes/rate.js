const router = require("express").Router();
let Rate = require("../models/Rate");

router.route("/add").post((req, res)=>{
    const itemID = req.body.itemID;
    const buyerEmail = req.body.buyerEmail;
    const ratingCount = Number(req.body.ratingCount);
    const avgRate = Number(req.body.avgRate);


    const newRate = new Rate({
        itemID,
        buyerEmail,
        ratingCount,
        avgRate
    })

    newRate.save().then(()=>{
        res.json("Rate Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{
    Rate.find().then((rate)=>{
        res.json(rate);
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;