const router = require("express").Router();
let Order = require("../models/Order");

router.route("/add").post((req, res)=>{
    const buyeremail = req.body.buyeremail;
    const buyername = req.body.buyername;
    const buyerphone = req.body.buyerphone;
    const buyeraddress = req.body.buyeraddress;
    const buyernic = req.body.buyernic;
    const totalamount = req.body.totalamount;
    const deliveryagent = req.body.deliveryagent;
    const paymentmethod = req.body.paymentmethod;
    const status = req.body.status;


    const newOrder = new Order({
        buyeremail,
        buyername,
        buyerphone,
        buyeraddress,
        buyernic,
        totalamount,
        deliveryagent,
        paymentmethod,
        status
    })

    newOrder.save().then(()=>{
        res.json("Order Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{
    Order.find().then((order)=>{
        res.json(order);
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;