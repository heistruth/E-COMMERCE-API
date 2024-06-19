import { AppDataSource } from "./data-source"
import express from "express";
import router from "./routes/userRoute";
import { PORT } from "./config";
import bodyParser from "body-parser";
// import jwt from "jsonwebtoken"
// import { User } from "./entity/User";

// const userRepository = AppDataSource.manager.getRepository(User)

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(router)

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

