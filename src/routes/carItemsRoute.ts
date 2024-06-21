import {Router} from "express"
import CartItemController from "../controllers/cartItemController";

const router = Router();


router.patch("/updatcartitem/:id", CartItemController.updateCartItem);
router.delete("/removecartitem/:id",  CartItemController.removecartitem);


export default router;
