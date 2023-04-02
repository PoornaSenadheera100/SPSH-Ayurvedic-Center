const router = require("express").Router();
let Buyer = require("../models/Buyer");
let Item = require("../models/Item");

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

        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: 'spshayurvedic@gmail.com',
            subject: 'Registration Successful',
            text: 'test',
            html: `<strong>
                    Dear ${name},<br/><br/>

                    Thank you for registering with us. Your account has been created successfully.<br/><br/>

                    If you have any questions or concerns about these changes, please don't hesitate to contact us. Our team is always here to help.<br/>

                    Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>

                    Regards, <br/>
                    Administrator, <br/>
                    SPSH Ayurvedic Center, Sri Lanka
                </strong>`,
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent')
        }).catch((error) => {
            console.error(error)
        })

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

        // const sgMail = require('@sendgrid/mail')
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        // const msg = {
        //     to: buyerId,
        //     from: 'spshayurvedic@gmail.com',
        //     subject: 'Registration Successfull',
        //     text: 'test',
        //     html: `<strong>
        //             Dear ${name},<br/><br/>
        //             Thank you for registering with us. Your account has been created successfully.<br/><br/>
        //             Regards, <br/>
        //             Administrator, <br/>
        //             SPSH Ayurvedic Center, Sri Lanka
        //         </strong>`,
        // }
        // sgMail.send(msg).then(() => {
        //     console.log('Email sent')
        // }).catch((error) => {
        //     console.error(error)
        // })

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

router.route("/get/email/:email").get(async(req, res)=>{
    let email = req.params.email;
    await Buyer.find({"email": `${email}`}).then((buyer)=>{
        res.json(buyer);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get the buyer", error: err.message});
    })
})

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

        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: 'spshayurvedic@gmail.com',
            subject: 'Your Account Details Have Been Updated',
            text: 'test',
            html: `<strong>
                    Dear ${name},<br/><br/>

                    We wanted to let you know that we have recently updated your account details. 
                    Please review the changes we made to ensure that your information is accurate and up-to-date.<br/><br/>

                    If you have any questions or concerns about these changes, please don't hesitate to contact us. Our team is always here to help.<br/>

                    Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>
                    
                    Best Regards, <br/>
                    Administrator, <br/>
                    SPSH Ayurvedic Center, Sri Lanka
                </strong>`,
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent')
        }).catch((error) => {
            console.error(error)
        })

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating the buyer", error: err.message});
    })
})

router.route("/delete/email/:paraemail").delete(async(req, res)=>{
    let buyerEmail = req.params.paraemail;

    await Buyer.findOneAndDelete({"email" : buyerEmail}).then(()=>{
        res.status(200).send({status: "Buyer Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Buyer", error: err.message});
    })
})


//RETRIEVEING SINGLE ITEM DETAILS
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