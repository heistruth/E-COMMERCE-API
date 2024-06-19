import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction} from "express";
import { Cart } from "../entity/cart";


class userController {
    public static signup = async (req: Request, res: Response, next: NextFunction) => {
        const { firstname, lastname, email, username, age, password } = req.body;

        try {
            if (!email || !password || !firstname || !lastname) {
                return res.status(400).send({ message: "all fields are required ❗️"});
            }

            if (!validator.isEmail(email)) {
                return res.status(400).send({ message: "Invalid email format ❗️"});
            }

            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({ where: { email } });

            if(existingUser) {
                return res.status(400).send({ message: "User with this email already exists ❌"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = userRepository.create({
                firstname,
                lastname,
                email,
                age,
                username,
                password : hashedPassword,
            })
            

            await userRepository.save(newUser);

            const cartRepository = AppDataSource.getRepository(Cart);
            const newCart = cartRepository.create({
                user: newUser,
            });

            await cartRepository.save(newCart);

            const token = jwt.sign({ email: newUser.email, type: newUser.type}, process.env.SECRETKEY || 'secretstring', { expiresIn: '2 days'});
            res.status(201).send({ message: `User created successfully as ${newUser.type}`, user: { email: newUser.email, type: newUser.type, firstname: newUser.firstname, lastname: newUser.lastname, username: newUser.username, age: newUser.age }, token });
            // res.status(201).send({ message: `User created successfully as ${newUser.type}`, user: newUser });

        } catch (error) {
            next(error)
        }   
    };

    public static login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        try {
            const secret: string = process.env.SECRETKEY || 'secretstring';

            if (!email || !password) {
                return res.status(400).send({ message: "Login with registered email and password 🚫"});
            }

            const userRepository = AppDataSource.getRepository(User);
            const foundUser = await userRepository.findOne({ where: { email } });

            if (!foundUser) {
                return res.status(404).send({ message: "User email not found ❌ " });
            }

            const isMatch = bcrypt.compareSync(password, foundUser.password);

            if (isMatch) {
                const token = jwt.sign(
                    { email: foundUser.email, type: foundUser.type },
                    secret,
                    { expiresIn: '2 days' }
                );

                res.status(200).send({ message: `Logged in as ${foundUser.type}`, user: { username: foundUser.username }, token });
            } else {
                res.status(403).send({ message: "Password is not correct ❗️" });
            }
        } catch (error) {
            next(error);
        }
    };

    public static logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).send({ message: "Logged out successfully" });
        } catch (error) {
            next(error);
        }
    };

    public static deleteuser = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                return res.status(404).send({ message: "User not found ❌" });
            }

            await userRepository.remove(user);

            res.status(200).send({ message: "Account deleted successfully" });
        } catch (error) {
            next(error);
        }
    };

    public static updateuser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, email, username, age, password } = req.body;
        const id = req.user_id

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            return res.status(404).send({ message: "User not found ❌" });
        }

        // Update user fields if provided in the request body
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        if (username) user.username = username;
        if (age) user.age = age;
        if (password) user.password = password;

        await userRepository.save(user);

        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        console.log(error)
    }
    };
}


export default userController;