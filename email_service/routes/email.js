const router = require("express").Router();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.route("/register/:name/:email").post((req, res)=>{
    let name = req.params.name;
    let email = req.params.email;

    const msg = {
        to: email,
        from: 'spshayurvedic@gmail.com',
        subject: 'Registration Successful',
        text: 'test',
        html: `<strong>
                Dear ${name},<br/><br/>

                Thank you for registering with us. Your account has been created successfully.<br/><br/>

                If you have any questions or concerns, please don't hesitate to contact us. Our team is always here to help.<br/>

                Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>

                Regards, <br/>
                Administrator, <br/>
                SPSH Ayurvedic Center, Sri Lanka
            </strong>`,
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent');
        res.send("Email sent");
    }).catch((error) => {
        console.error(error)
    })
})

router.route("/update/:name/:email").post((req, res)=>{
    let name = req.params.name;
    let email = req.params.email;

    const msg = {
        to: email,
        from: 'spshayurvedic@gmail.com',
        subject: 'Registration Successful',
        text: 'test',
        html: `<strong>
                Dear ${name},<br/><br/>

                Thank you for registering with us. Your account has been created successfully.<br/><br/>

                If you have any questions or concerns, please don't hesitate to contact us. Our team is always here to help.<br/>

                Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>

                Regards, <br/>
                Administrator, <br/>
                SPSH Ayurvedic Center, Sri Lanka
            </strong>`,
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent');
        res.send("Email sent");
    }).catch((error) => {
        console.error(error)
    })
})

module.exports = router;