import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import AuthRoutes from "../modules/auth/auth.rotes";
import PetRoutes from "../modules/pet/pet.routes";
import AdminRoutes from "../modules/admin/admin.routes";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/pet",
    route: PetRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
