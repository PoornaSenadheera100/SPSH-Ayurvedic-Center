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
        html: `<p>
                Dear ${name},<br/><br/>

                Thank you for registering with us. Your account has been created successfully.<br/><br/>

                If you have any questions or concerns, please don't hesitate to contact us. Our team is always here to help.<br/>

                Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>

                Regards, <br/>
                Administrator, <br/>
                SPSH Ayurvedic Center, Sri Lanka
            </p>`,
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent');
        res.send("Email sent");
    }).catch((error) => {
        console.error(error);
        res.send(error);
    })
})

router.route("/update/:name/:email").post((req, res)=>{
    let name = req.params.name;
    let email = req.params.email;

    const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: 'spshayurvedic@gmail.com',
            subject: 'Your Account Details Have Been Updated',
            text: 'test',
            html: `<p>
                    Dear ${name},<br/><br/>

                    We wanted to let you know that we have recently updated your account details. 
                    Please review the changes we made to ensure that your information is accurate and up-to-date.<br/><br/>

                    If you have any questions or concerns about these changes, please don't hesitate to contact us. Our team is always here to help.<br/>

                    Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>

                    Best Regards, <br/>
                    Administrator, <br/>
                    SPSH Ayurvedic Center, Sri Lanka
                </p>`,
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent');
            res.send("Email sent");
        }).catch((error) => {
            console.error(error);
            res.send(error);
        })
})

router.route("/delete/:name/:email").post((req, res)=>{
    let name = req.params.name;
    let email = req.params.email;

    const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: 'spshayurvedic@gmail.com',
            subject: 'Your Account Has Been Removed',
            text: 'test',
            html: `<p>
                    Dear ${name},<br/><br/>

                    We're sorry to see you go, but we wanted to confirm that your account has been successfully removed from our system.<br/><br/>

                    If you have any questions or concerns, please don't hesitate to contact us. Our team is always here to help.<br/>

                    Thank you for the time you spent with us and we wish you all the best.<br/><br/>

                    Regards, <br/>
                    Administrator, <br/>
                    SPSH Ayurvedic Center, Sri Lanka
                </p>`,
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent');
            res.send("Email sent");
        }).catch((error) => {
            console.error(error);
            res.send(error);
        })
})

router.route("/payment").post((req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let orderRef = req.body.orderRef;
    let totAmount = req.body.totAmount;

    const msg = {
        to: email,
        from: 'spshayurvedic@gmail.com',
        subject: `Order Confirmation - ${orderRef}`,
        text: 'test',
        html: `<p>
                Dear ${name},<br/><br/>

                Thank you for your recent purchase on SPSH Ayurvedic Center. We are pleased to confirm that your order has been successfully processed and is now being prepared for shipping.<br/><br/>

                <u>Order Details:</u><br/><br/>
                <b>Order Number:</b> ${orderRef}<br/>
                <b>Total Amount:</b> Rs.${parseFloat(totAmount).toFixed(2)}<br/><br/>

                If you have any questions or concerns, please don't hesitate to contact us. Our team is always here to help.<br/>

                Thank you for choosing our service, and we look forward to continuing to serve you.<br/><br/>

                Regards, <br/>
                Administrator, <br/>
                SPSH Ayurvedic Center, Sri Lanka
            </p>`,
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent');
        res.send("Email sent");
    }).catch((error) => {
        console.error(error);
        res.send(error);
    })
})

module.exports = router;