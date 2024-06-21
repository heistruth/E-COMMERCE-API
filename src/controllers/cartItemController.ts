import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cart_items } from "../entity/cart_items";
import { Repository } from "typeorm";

const cartItemRepository = AppDataSource.manager.getRepository(Cart_items);

class CartItemController {
    public static updateCartItem = async (req: Request, res: Response) => {
        try {
            const { quantity } = req.body;
            const cartItemId = Number(req.params.id);

            const cartItem = await cartItemRepository.findOneBy({ id: cartItemId });

            if (!cartItem) {
                return res.status(404).send("Cart item not found");
            }
            cartItem.quantity = quantity;
            await cartItemRepository.save(cartItem);

            res.status(200).send({ message: "Cart item updated successfully", cartItem });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    public static removecartitem = async (req: Request, res: Response) => {
        try {
            const cartItemId = Number(req.params.id);

            const cartItem = await cartItemRepository.findOneBy({ id: cartItemId });

            if (!cartItem) {
                return res.status(404).send("Cart item not found");
            }

            await cartItemRepository.delete(cartItemId);

            res.status(200).send({ message: "Cart item deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };
}

export default CartItemController;
