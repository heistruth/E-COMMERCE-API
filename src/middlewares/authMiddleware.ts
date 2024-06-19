import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";



const userRepository =  AppDataSource.manager.getRepository(User);

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization?.split(" ")[1];

const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access denied. No token provided.");
  }
  const token = authHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'secretstring')
        if(!decoded) {
            return res.status(400).json({ message: "Invalid token"})
        }
        const user = await userRepository.findOneBy({ email: decoded.email});
        if (!user) {
            return res.status(404).json ({ msg: "User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }    
};

export default authMiddleware;
