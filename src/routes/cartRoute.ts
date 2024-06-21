import {Router} from "express"
import cartController from "../controllers/cartController";

const router = Router();


router.get("/cart/items/:id", cartController.getAllItemInCart)
router.post("/addtocart/:id", cartController.addToCart)
router.get("/getcartbyid", cartController.getcartbyid)
router.delete("/clearcart/:id", cartController.clearCart)
router.post("/checkout/:id", cartController.checkout)



export default router;
