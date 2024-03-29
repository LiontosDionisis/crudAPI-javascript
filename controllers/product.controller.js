const product = require("../models/product.model");
const logger = require("../logger/logger");

exports.findAll = async(req, res) => {
    console.log("Search for all products");

    try{
        const result = await product.find();
        res.status(200).json({data: result});
        console.log("Success in finding all products");
        logger.info("Success in finding all products");
    } catch (err) {
        res.status(404).json({data: err});
        console.log("Error in finding all products")
        logger.error("Error in finding all products");
    }
}

exports.findOne = async(req, res) => {
    console.log("Find one product");
    const id = req.params.id;

    try {
        const result = await product.findOne({_id: id});
        res.status(200).json({data: result});
        logger.info("Found 1 product");
        console.log("Found 1 product");
    } catch (err) {
        res.status(404).json({data: err});
        logger.error("No product was found");
        console.log("No product was found")
    }
}

exports.create = async(req, res) => {
    const newProduct = new product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })

    try {
        const result = await newProduct.save();
        res.status(200).json({data: result});
        logger.info("Product created");
    } catch(err) {
        res.status(404).json({data: err});
        logger.error("Error in creating product")
    }
}

exports.update = async(req, res) => {
    const id = req.params.id
    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await product.findOneAndUpdate(
            {_id: id},
            updateProduct,
            {new: true}
        )
        res.status(200).json({data: result});
        logger.info("Product updated");
    } catch (err) {
        res.status(404).json({data: err});
        logger.error("Error in updating product")
    }
}

exports.delete = async(req, res) => {
    const id = req.params.id;

    try {
        const result = await product.findOneAndDelete(
            {_id: id}
        )
        res.status(200).json({data: result});
        logger.info("Product deleted");
    } catch(err) {
        res.status(404).json({data: err})
        logger.error("Error in deleting")
    }
}