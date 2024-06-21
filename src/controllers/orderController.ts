import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Orders } from "../entity/orders";

const ordersRespository = AppDataSource.manager.getRepository(Orders);
const userRepository = AppDataSource.manager.getRepository(User);

class orderController {
    public static getorderbyid = async (req: Request, res: Response, next: NextFunction) => {
        const orderId = Number(req.params.id)

        try {
            const order = await ordersRespository.findOne({ where: {id: orderId }});

            if (!order) {
                return res.status(404).send({ message: "Ordder not found ❌" });
            }

            res.status(200).send(order);
        } catch (error) {
            next(error);
        }
    };

    public static listOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await ordersRespository.find();
            res.status(200).send(orders);
        } catch (error) {
            next(error);
        }
    };

    public static getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
        const userId = Number(req.params.id)

        try {
            const user = await userRepository.findOne({ where: { id: userId }, relations: ["orders"] });

            if (!user) {
                return res.status(404).send({ message: "User not found ❌" });
            }

            res.status(200).send(user.orders);
        } catch (error) {
            next(error);
        }
    };
}
export default orderController;
