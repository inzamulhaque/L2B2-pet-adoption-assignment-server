import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema } from "./auth.validation";
import { userLogin } from "./auth.controller";

const router: Router = Router();

router.post("/login", validateRequest(loginValidationSchema), userLogin);

const AuthRoutes = router;
export default AuthRoutes;
