// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";

// // adding payment gateway
// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// // placing user order for frontend
// const placeOrder = async (req, res) => {

//     // frontend url
//     const frontend_url = "http://localhost:5173";

//     try {
//         // create new order
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address
//         })
//         // save order to database
//         await newOrder.save();
//         // empty user cart
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        
//         // PAYMENT GATEWAY
//         // create line items for payment
//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.name,
//                     images: [item.image],
//                 },
//                 // converting price to paise
//                 unit_amount: item.price*100, // (1 INR = 100 paise)
//             },
//             // quantity of item
//             quantity: item.quantity,
//         }))

//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: "Delivery Charge",
//                 },
//                 unit_amount: 40*100,
//             },
//             quantity: 1,
//         })

//         // create session for payment
//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: "payment",
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         });

//         // send session url to frontend
//         res.json({success:true, session_url: session.url});
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false, message: "Error... order not placed"})
//     }
//     res.json({success:true, meassage: "Order Placed"})
// }

// // verify payment
// const verifyOrder = async (req, res) => {
//     const {orderId, success} = req.body;
//     try {
//         if (success==="true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true});
//             res.json({success:true, message: "Paid"})
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false, message: "Payment Failed"})
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message: "Error... order not placed"})
//     }
// }

// export { placeOrder, verifyOrder };

import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";

const razorpayInstance = createRazorpayInstance();


// STEP 2 & 4
const createOrder = async (req, res) => {
    // do not accept amount from client
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
        res.status(400).json({
            success: false,
            message: "Please provide orderId and amount",
        });
    }

    // order id se fetch krenge order ka data including its price

    // create an order
    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order#1",
    };

    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.log("Error creating Razorpay order: ", err);
                return res.status(500).json({
                    success: false,
                    message: "Error creating razorpay order",
                });
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error... order not placed" });
    }
}


// STEP 9 & 10
const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // create hmac object
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        res.status(200).json({ success: true, message: "Payment Verified" });
    } else {
        res.status(400).json({ success: false, message: "Payment Verification Failed" });
    }

}

export { createOrder, verifyPayment };