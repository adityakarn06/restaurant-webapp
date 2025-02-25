import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
    // storing name of the image uploaded
    let image_filename = `${req.file.filename}`;

    // creating a new food item
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })

    // saving the food item to the database
    try {
        await food.save();
        res.json({success:true, message:"Food Added Successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message:"Error in adding food"});
    }
}

// get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message:"Error in fetching food items"});
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed Successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message:"Error in removing food"});
    }
}

export {addFood, listFood, removeFood};