import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserSchema } from "./user.validation";
import {
  createNewAdmin,
  createNewUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
} from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createUserSchema),
  createNewAdmin
);

router.post("/create-user", validateRequest(createUserSchema), createNewUser);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  getMyProfile
);

router.patch(
  "/update-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  updateMyProfile
);

router.delete(
  "/delete-user/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteUser
);

const UserRoutes = router;
export default UserRoutes;
