import {Router} from "express"
import UserController from "../controllers/userController";

const router = Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.patch("/updateuser", UserController.updateuser);
router.delete("/deleteuser", UserController.deleteuser);


export default router;
