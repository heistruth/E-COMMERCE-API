import {Router} from "express"
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", authMiddleware, UserController.logout);
router.patch("/updateuser", authMiddleware, UserController.updateuser);
router.delete("/deleteuser", authMiddleware, UserController.deleteuser);


export default router;
