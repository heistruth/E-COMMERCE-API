import {Router} from "express"
import productController from "../controllers/productController";

const router = Router();


router.get("/getallproducts", productController.getallproducts)
router.get("/getproductbyid", productController.getproductbyid)
router.post("/createproduct", productController.createproduct)
router.patch("/updateproduct", productController.updateproduct)
router.delete("/deleteproduct", productController.deleteproduct)


export default router;
