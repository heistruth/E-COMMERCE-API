import {Router} from "express"

import cartController from "../controllers/cartController";


const router = Router();


router.get("/getcartbyid", cartController.getcartbyid)
router.post("/addtocart", cartController.addtoCart)



export default router;
