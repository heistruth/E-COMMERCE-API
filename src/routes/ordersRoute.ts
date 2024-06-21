import {Router} from "express"
import orderController from "../controllers/orderController";

const router = Router();

router.get("/listOrders", orderController.listOrders)
router.get("/user/order/:id", orderController.getUserOrders)
router.get("/getorderbyid/:id", orderController.getorderbyid)

export default router;
