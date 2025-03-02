import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  loginValidationSchema,
  verifyOTPValidationSchema,
} from "./auth.validation";
import {
  changePassword,
  forgetPassword,
  userLogin,
  verifyOTP,
} from "./auth.controller";
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

router.post(
  "/forget-password",
  validateRequest(forgetPasswordValidationSchema),
  forgetPassword
);

router.post(
  "/verify-otp",
  validateRequest(verifyOTPValidationSchema),
  verifyOTP
);

const AuthRoutes = router;
export default AuthRoutes;
