import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema); 
// added (mongoose.models.food) because everytime we run this file new model will be created and it will give error

export default foodModel;