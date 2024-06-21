import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Cart } from "../entity/cart";
import { Cart_items } from "../entity/cart_items";
import { User } from "../entity/User";
import { Products } from "../entity/Products";
import { Orders } from "../entity/orders";
import { Repository } from "typeorm";


const cartItemRepository = AppDataSource.manager.getRepository(Cart_items);
const cartRepository = AppDataSource.manager.getRepository(Cart);
const orderRespository = AppDataSource.manager.getRepository(Orders);
const userRepository = AppDataSource.manager.getRepository(User);
const productRepository = AppDataSource.manager.getRepository(Products)

class cartController {
    public static getcartbyid = async (req: any, res: Response, next: NextFunction) => {
        const  { cart_id }  = req.body;
        const id = req.cart_id

        try {
            const cart = await cartRepository.findOne({ where: {id: cart_id }});

            if (!cart) {
                return res.status(404).send({ message: "Cart not found ❌" });
            }

            res.status(200).send(cart);
        } catch (error) {
            next(error);
        }
    };

    public static addToCart = async (req: Request, res: Response) => {
        try {
            const {quantity, product_id} = req.body
            const cartId = Number(req.params.id)
            const cart = await cartRepository.findOneBy({id : cartId})
            if(!cartId){
                res.status(400).send("Cart doesn't exist")
            }
        const newCartItem = cartItemRepository.create({
            quantity,
            product_id,
            cart_id : cart.id
        })
        await cartItemRepository.save(newCartItem)
        res.status(201).send({"cart item": newCartItem})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    };

    public static getAllItemInCart = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id)
            const cart = await cartRepository.findOne({
                where: {id},
                relations: ["cart_items"]
            })
            if(!cart){
                res.status(400).send("Cart doesn't exist")
            }
         res.status(200).send(cart.cart_items)
        } catch (error) {
            console.log(error)
        }
    };

    public static clearCart = async (req: Request, res: Response) => {
        try {
            const cartId = Number(req.params.id);
            const cart = await cartRepository.findOneBy({ id: cartId});

            if (!cart) {
                return res.status(400).send("Cart doesn't exist");
            }

            await cartItemRepository.delete({ cart_id: cartId });

            res.status(200).send({ message: "Cart cleared successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    public static checkout = async (req: any, res: Response) => {
        try {
            const user_id = req.user_id
            const user = await userRepository.findOneBy({ id: user_id})
            if(!user){
                res.status(404).send("No user found")
            }
            const cartId = Number(req.params.id);
            const cart = await cartRepository.findOne({
                where: { id: cartId },
            });

            if (!cart) {
                return res.status(400).send("Cart doesn't exist");
            }

            let totalAmount = 0;
            for (const item of cart.cart_items) {
                totalAmount += item.quantity * item.products.price;
            }

            const newOrder = orderRespository.create({
                user_id,
                total_amount : totalAmount,
                status : "pending",
                createdAt: new Date(),
                cart_id : cartId,
                items: cart.cart_items.map(item => ({
                    productId: item.product_id,
                    quantity: item.quantity,
                    price: item.products.price
                }))
                
            })

            await orderRespository.save(newOrder);

            await cartItemRepository.delete({ cart_id: cartId });

            res.status(200).send({ message: "Checkout successful", order: newOrder });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };    
}
export default cartController;
