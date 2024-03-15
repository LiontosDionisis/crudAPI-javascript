const  User = require("../models/user.model");

exports.findAll = async(req, res) => {
    console.log("Search for all users");
    try {
        const result = await User.find();
    res.status(200).json({data: result});
    } catch (err) {
        console.log(err);
    }
}

exports.findOne = async(req, res) => {
    console.log("Searching for a user");

    const username = req.params.username;
    try {
        const result = await User.findOne({username: username});
        res.status(200).json({data: result});
    } catch(err){
        console.log(err);
    }
}

exports.create = async(req, res) => {
    console.log("Insert user");

    console.log(req.body);

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    });

    try {
        const result = await newUser.save();
        res.status(200).json({data: result})
        console.log("User saved");

    } catch(err) {
        res.status(400).json({data: err});
        console.log("User insert error");
    }

}

exports.update = async(req, res) => {
    const username = req.params.username;

    console.log("Update user with username: ", username);
    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
    }

    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            {new: true}
        )
        res.status(200).json({data: result});
        console.log("User", username,  "updated");
    } catch(err){
        res.status(400).json({data: err});
        console.log("User update error");
    }
}

exports.delete = async(req,res) => {
    const username = req.params.username;

    console.log("Delete user: ", username);

    try {
        const result = await User.findOneAndDelete(
            {username: username}
        )
        res.status(200).json({data: result});
        console.log("User ", username, " has been deleted");
    } catch(err) {
        res.status(400).json({data: err});
        console.log("Error in deleting user: ", username);
    }
}