import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { getUserById } from "./admin.controller";

const router: Router = Router();

router.get(
  "/get-user/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getUserById
);

const AdminRoutes = router;
export default AdminRoutes;
