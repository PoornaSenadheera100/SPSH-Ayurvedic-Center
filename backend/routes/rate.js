const router = require("express").Router();
let Rate = require("../models/Rate");

router.route("/add").post((req, res)=>{
    const itemID = req.body.itemID;
    const buyerEmail = req.body.buyerEmail;
    const rate = Number(req.body.rate);


    const newRate = new Rate({
        itemID,
        buyerEmail,
        rate
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

router.route("/get/:itemID").get(async(req,res)=>{
    let itemID = req.params.itemID;
    
    await Rate.find({"itemID": itemID}).then((rate)=>{
        res.json(rate);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Opps! Error in loading the rates"});
    })
})

router.route("/get/:buyerEmail/:itemID").get(async(req,res)=>{
    let buyerEmail = req.params.buyerEmail;
    let itemID = req.params.itemID;
    
    await Rate.find({"buyerEmail": buyerEmail, "itemID": itemID}).then((rate)=>{
        res.json(rate);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Opps! Error in loading the rates"});
    })
})

router.route("/update").put(async(req, res)=>{
    const {itemID, buyerEmail, rate} = req.body;
    const updateRate = {
        itemID,
        buyerEmail,
        rate
    }

    await Rate.findOneAndUpdate({"buyerEmail" : buyerEmail, "itemID": itemID}, updateRate).then(()=>{
        res.status(200).send({status: "Rate Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating the rate", error: err.message});
    })
})

module.exports = router;