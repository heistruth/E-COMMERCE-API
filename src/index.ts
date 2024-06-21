import { AppDataSource } from "./data-source"
import express from "express";
import cartRouter from "./routes/cartRoute";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import cartItemRouter from "./routes/carItemsRoute";
import orderRouter from "./routes/ordersRoute"
import { PORT } from "./config";
import bodyParser from "body-parser";

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cartRouter)
app.use(userRouter)
app.use(productRouter)
app.use(cartItemRouter)
app.use(orderRouter)

const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Connected to database succesfully 🦇');

        app.use(express.json());

        app.listen(PORT, () => {
            console.log(`Now running on port ${PORT} 👽`);
        });
    } catch (error) {
        console.error(error);
        throw new Error('Unable to connect to db');
    }
};
main()

