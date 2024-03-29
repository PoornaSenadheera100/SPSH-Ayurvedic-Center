const router = require("express").Router();
let Item = require("../models/Item");
const multer = require("multer");
//import file system.
const fs = require('fs');

//multer has option called disk storage.2 parameters --> destination and file name.
//First we save the images in the computer, and then move it to MongoDB
const storage = multer.diskStorage({
    //creates a folder called uploads and stores the files in it.
     destination:(req,file,cb)=>{
     //cb is the callback.
     cb(null,'uploads')
     },
     filename:(req,file,cb) => {
         //since we could receive multiple files, we are going to store it with the original name.
         const {originalname} = file;
         cb(null,file.originalname);
     },
 });
 

//Specify the storage as multer storage
const upload = multer({
    //Specify the storage as our "Storage" that we created.
    storage:storage
//since we are uploading files one by one, we have to make use of "single".
//we are going to upload images using this name (testImage).
//since we are uploading files one by one, should make use of "single"
})


//Since, the "single" method has "image", when passing data, the attribute will be "image"
//If you had "testImage" instead, then in Postman, the attribute will be named as "testImage".
router.route("/add").post(upload.single('Image'),(req, res)=>{
    //let SupplierId = req.params.SupplierId;
    const SupplierId = req.body.SupplierId;
    const ProductId = req.body.ProductId;
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Quantity = Number(req.body.Quantity);
    //This is where you read the content or the file.
    const Image = req.body.Image;


    const newItem = new Item({
        SupplierId,
        ProductId,
        Name,
        Description,
        Price,
        Quantity,
        Image : {
            data: Buffer.from(Image,'base64'),
            contentType: 'Image/png'
        },
    });

    newItem.save().
    then(()=>{
        res.json("Item Added.");
    }).catch((err)=>{
        console.log(err);
    });
   
})

//RETRIEVE DETAILS ROUTE.
router.route("/:SupplierId").get(async(req, res)=>{

    let SupplierId = req.params.SupplierId;

    const retrieve = await Item.find({"SupplierId": SupplierId}).then((item)=>{
        res.json(item);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error in retrieving details."});
    })
})

//DELETE ROUTE.
router.route("/delete/:SupplierId/:ProductId").delete(async(req, res)=>{
    let SupplierId = req.params.SupplierId;
    let ProductId = req.params.ProductId;
    await Item.findOneAndDelete({"SupplierId": `${SupplierId}`, "ProductId": `${ProductId}`}).then(()=>{
        res.status(200).send({status: "Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in deleting Item", error: err.message});
    })
})

//RETRIEVEING ONE SPECIFIC DETAIL
router.route("/get/:SupplierId/:ProductId").get(async(req,res) =>{ 
    let SupplierId = req.params.SupplierId;
    let ProductId = req.params.ProductId;
    const item = await Item.find({"SupplierId": `${SupplierId}`, "ProductId": `${ProductId}`})
    .then((item)=>{
        res.status(200).send({status:"Item fetched",item})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getting one item",error:err.message});
    })
})

//UPDATE ROUTE
router.route("/update/:SupplierID/:ProductId").put(async(req,res)=>{
    
    //The supplier ID and Product ID is fetched and stored in variables.
    let supplierID = req.params.SupplierID;
    let productId = req.params.ProductId;

    
    const {SupplierID,ProductId,Name,Description,Price,Quantity,Image} = req.body;

    const updateItem = {
        SupplierID,
        ProductId,
        Name,
        Description,
        Price,
        Quantity,
        Image
    }
    //const update = 
    await Item.findOneAndUpdate({ SupplierID: supplierID, ProductId: productId },
        updateItem)
    .then(()=>{
        res.status(200).send({status : "Item Updated"})
        //,item: update
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});
    })

})

// RETRIEVE ALL ITEMS ROUTE.
router.route("/").get((req, res)=>{
    Item.find().then((items)=>{
        res.json(items);
    }).catch((err)=>{
        console.log(err);
    })
})

// Retrieve a single item
router.route("/getitem/:ProductId").get(async(req, res)=>{

    let ProductId = req.params.ProductId;

    const retrieve = await Item.find({"ProductId": ProductId}).then((item)=>{
        res.json(item);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error in retrieving details."});
    })
})

module.exports = router;