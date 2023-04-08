const router = require("express").Router();
let Order = require("../models/Order");

router.route("/add").post((req, res)=>{
    const orderRef = req.body.orderRef;
    const buyeremail = req.body.email;
    const buyername = req.body.name;
    const buyerphone = req.body.phone;
    const buyeraddress = req.body.address;
    const buyernic = req.body.nic;
    const totalamount = req.body.totalAmount;
    const deliveryagent = req.body.delAgent;
    const paymentmethod = req.body.paymentMethod;
    const status = req.body.status;
    const appStatus = req.body.appStatus;


    const newOrder = new Order({
        orderRef,
        buyeremail,
        buyername,
        buyerphone,
        buyeraddress,
        buyernic,
        totalamount,
        deliveryagent,
        paymentmethod,
        status,
        appStatus
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

router.route("/get/:buyerEmail").get(async(req,res)=>{
    let buyerEmail = req.params.buyerEmail;
    
    await Order.find({"buyeremail": buyerEmail}).then((order)=>{
        res.json(order);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Opps! Error in loading the orders"});
    })
})


module.exports = router;