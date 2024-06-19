import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import cartController from "../controllers/cartController";
import productController from "../controllers/productController";

const router = Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.delete("/deleteuser", authMiddleware, userController.deleteuser);
router.patch("/updateuser", authMiddleware, userController.updateuser);
router.get("/getcartbyid", cartController.getcartbyid)
router.post("/addtocart", cartController.addtoCart)
// router.delete("/clearcart", cartController.clearcart)
router.get("/getallproduts", productController.getallproducts)
router.get("/getproductbyid", productController.getproductbyid)
router.post("/createproduct", productController.createproduct)
router.patch("/updateproduct", productController.updateproduct)
router.delete("/deleteproduct", productController.deleteproduct)

// Example of protecting other sensitive routes
// router.get("/profile", authMiddleware, userController.getProfile);

export default router;
