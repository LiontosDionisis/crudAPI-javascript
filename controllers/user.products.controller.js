const User = require("../models/user.model");

exports.findAll = async(req, res) => {
    console.log("Find all users' products");

    try {
        const result = await User.find({}, {_id:0,username:1,products:1});
        res.status(200).json({data: result});
        console.log("Reading all users' products");
    } catch(err){
        res.status(400).json({data: err});
        console.log("Error in finding users' products");
    }
}

exports.findOne = async(req, res) => {
    console.log("Find one user's products");
    
    const username = req.params.username;
    console.log("Searching for user: ", username);
    try {
        const result = await User.find({username:username}, {_id:0,
        username:1,products:1});
        res.status(200).json({data: result});
        console.log("Got all user's products");
    } catch(err) {
        res.status(400).json({data: err});
        console.log("Error in finding user's product(s)");
    }
}

exports.create = async (req, res) => {
    console.log("Adding product");
    const username = req.body.username;
    const products = req.body.products;

    try {
        const result = await User.findOneAndUpdate(
            {username:username},
            {
                $push: {
                    products: products
                }
            }
        )
        res.status(200).json({data:result});
    } catch(err){
        res.status(400).json({data:err});
        console.log("Error");
    }
}

exports.update = async (req, res) => {
    const username = req.params.username;
    const _id = req.body.product._id;
    const quantity = req.body.product.quantity;
    console.log("Update product for username: ", username);

    try {
        const result = await User.updateOne(
            {username:username, "products._id": _id},
            {
                $set: {
                    "products.$.quantity": quantity
                }
            }
        );
        res.status(200).json({data:result});
    }catch(err) {
        res.status(400).json({data:err});
    }
}