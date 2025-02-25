import userModel from '../models/userModel.js';

// we've already added an auth middleware to each cart route which is giving us the user id in req.body.userId

// add items to user cart
const addToCart = async (req,res) => {
    try {
        // get user data
        let userData = await userModel.findById(req.body.userId);
        // get user cart data
        let cartData = await userData.cartData;
        // check if item already exists in cart
        // if not add item to cart
        // if exists increment the quantity
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        // update user cart data in db
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        // send response
        res.json({success:true, message:"Item added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error...Item not added to cart"});
    }
}

// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // check if item exists in cart and decrement the quantity
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Item removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error...Item not removed from cart"});
    }
}

// fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error...Unable to fetch cart data"});
    }
}

export {addToCart, removeFromCart, getCart}