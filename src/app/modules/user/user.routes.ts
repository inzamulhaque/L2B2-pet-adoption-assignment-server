import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserSchema } from "./user.validation";
import { createNewUser } from "./user.controller";

const router: Router = Router();

router.post("/create-user", validateRequest(createUserSchema), createNewUser);

const UserRoutes = router;
export default UserRoutes;
