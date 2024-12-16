import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { deleteUserById, getAllUser, getUserById } from "./admin.controller";

const router: Router = Router();

router.get(
  "/get-users",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getAllUser
);

router.get(
  "/get-user/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getUserById
);

router.delete(
  "/delete-user/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteUserById
);

const AdminRoutes = router;
export default AdminRoutes;
