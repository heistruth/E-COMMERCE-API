import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Cart } from "../entity/cart";
import { Cart_items } from "../entity/cart_items";
import { User } from "../entity/User";
import { Products } from "../entity/Products";

class cartController {
    public static getcartbyid = async (req: any, res: Response, next: NextFunction) => {
        const  { cart_id }  = req.body;
        const id = req.cart_id

        try {
            const cartRepository = AppDataSource.getRepository(Cart);
            const cart = await cartRepository.findOne({ where: {id: cart_id } });

            if (!cart) {
                return res.status(404).send({ message: "Cart not found ❌" });
            }

            res.status(200).send(cart);
        } catch (error) {
            next(error);
        }
    };

    // public static clearcart = async (req: any, res: Response, next: NextFunction) => {
    //     const { cart_id } = req.body;

    //     try {
    //         const cartRepository = AppDataSource.getRepository(Cart);
    //         const cart = await cartRepository.findOne({
    //             where: { id: cart_id },
    //             relations: ["items"]
    //         });

    //         if (!cart) {
    //             return res.status(404).send({ message: "Cart not found ❌" });
    //         }

    //         cart.cart_items = [];
    //         await cartRepository.save(cart);

    //         res.status(200).send({ message: "Cart cleared successfully" });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    public static addtoCart = async (req: Request, res: Response, next: NextFunction) => {
        const { cart_id, product_id, quantity } = req.body;

        try {
            const cartRepository = AppDataSource.getRepository(Cart);
            const productRepository = AppDataSource.getRepository(Products);

            // Find the cart
            const cart = await cartRepository.findOne({ where: { id: cart_id } });

            if (!cart) {
                return res.status(404).send({ message: "Cart not found ❌" });
            }

            // Find the product
            const product = await productRepository.findOne({ where: { id: product_id } });

            if (!product) {
                return res.status(404).send({ message: "Product not found ❌" });
            }

            // Create a new cart item
            const cartItem = new Cart_items();
            cartItem.cart = cart;
            cartItem.products = product;
            cartItem.quantity = quantity;

            // Save the cart item
            const cartItemRepository = AppDataSource.getRepository(Cart_items);
            await cartItemRepository.save(cartItem);

            res.status(201).send({ message: "Item added to cart successfully ✔️", cartItem });
        } catch (error) {
            next(error);
        }
    };

//     public static checkout = async (req: Request, res: Response, next: NextFunction) => {
//         const { cartId, userId } = req.body;

//         try {
//             const userRepository = AppDataSource.getRepository(User);
//             const user = await userRepository.findOne({ where: { id: userId } });

//             if (!user) {
//                 return res.status(404).send({ message: "User not found ❌" });
//             }

//             const cartRepository = AppDataSource.getRepository(Cart);
//             const cart = await cartRepository.findOne({
//                 where: { id: cartId },
//                 relations: ["items", "items.product"]
//             });

//             if (!cart) {
//                 return res.status(404).send({ message: "Cart not found ❌" });
//             }

//             if (cart.items.length === 0) {
//                 return res.status(400).send({ message: "Cart is empty ❌" });
//             }

//             // Simulate checkout process
//             cart.items = [];
//             await cartRepository.save(cart);

//             res.status(200).send({ message: "Checkout successful" });
//         } catch (error) {
//             next(error);
//         }
//     };
}

export default cartController;
