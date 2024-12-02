import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  changePasswordValidationSchema,
  loginValidationSchema,
} from "./auth.validation";
import { changePassword, userLogin } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post("/login", validateRequest(loginValidationSchema), userLogin);

router.post(
  "/change-password",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(changePasswordValidationSchema),
  changePassword
);

const AuthRoutes = router;
export default AuthRoutes;
