import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRoute.js';
import "dotenv/config.js"
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db coonection
connectDB(process.env.MONGO_URL);

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));  // serving images (http://localhost:4000/images/1737997886706-Adi's%20Pic.jpg)
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
