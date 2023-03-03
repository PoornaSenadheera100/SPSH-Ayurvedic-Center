const router = require("express").Router();
let Admin = require("../models/Admin");

router.route("/get/email/:email").get(async(req, res)=>{
    let email = req.params.email;
    await Admin.find({"email": `${email}`}).then((admin)=>{
        res.json(admin);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get the buyer", error: err.message});
    })
})

module.exports = router;