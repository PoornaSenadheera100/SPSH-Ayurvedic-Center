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

module.exports = router;