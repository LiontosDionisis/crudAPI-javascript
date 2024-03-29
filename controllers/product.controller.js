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