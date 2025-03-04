import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import AuthRoutes from "../modules/auth/auth.routes";
import PetRoutes from "../modules/pet/pet.routes";
import AdminRoutes from "../modules/admin/admin.routes";
import AdoptionRoutes from "../modules/adoption/adoption.router";

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
    path: "/adoption",
    route: AdoptionRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
