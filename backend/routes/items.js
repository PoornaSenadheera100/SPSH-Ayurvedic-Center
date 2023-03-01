const router = require("express").Router();
let Item = require("../models/Item");

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
         cb(null,file.originalname);
     },
 });
 

//Specify the storage as multer storage.
const upload = multer({
    //Specify the storage as our "Storage" that we created.
    storage:storage
//since we are uploading files one by one, we have to make use of "single".
//we are going to upload images using this name (testImage).
//since we are uploading files one by one, should make use of "single"
})

router.route("/add").post(upload.single('testImage'),(req, res)=>{
    const productId = req.body.productId;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = Number(req.body.quantity);
    const image = req.body.image;


    const newItem = new Item({
        productId,
        name,
        description,
        price,
        quantity,
        image:{
            data: fs.readFileSync('uploads/',req.file.filename),
            contentType:"image/png"
        },
    })

    newItem.save().
    then(()=>{
        res.json("Item Added.");
    }).catch((err)=>{
        console.log(err);
    })
})

//RETRIEVE DETAILS ROUTE.
router.route("/").get((req, res)=>{
    Item.find().then((items)=>{
        res.json(items);
    }).catch((err)=>{
        console.log(err);
    })
})

//DELETE ROUTE.
router.route("/delete/:id").delete(async(req, res)=>{
    let itemId = req.params.id;

    await Item.findByIdAndDelete(itemId).then(()=>{
        res.status(200).send({status: "Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in deleting Item", error: err.message});
    })
})

//RETRIEVEING ONE SPECIFIC DETAIL
router.route("/get/:id").get(async(req,res) =>{
    let itemId = req.params.id;
    const item = await Item.findById(itemId)
    .then(()=>{
        res.status(200).send({status:"Item fetched",item:item})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getting one item",error:err.message});
    })
})

//UPDATE ROUTE
router.route("/update/:id").put(async(req,res)=>{
    let itemId = req.params.id;
    const {productId,name,description,price,quantity,image} = req.body;

    const updateItem = {
        productId,
        name,
        description,
        price,
        quantity,
        image
    }

    const update = await Item.findByIdAndUpdate(itemId,updateItem)
    .then(()=>{
        res.status(200).send({status : "Item Updated",item: update})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});
    })

})

module.exports = router;