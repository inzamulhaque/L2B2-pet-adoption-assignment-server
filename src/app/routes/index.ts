import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import AuthRoutes from "../modules/auth/auth.rotes";
import PetRoutes from "../modules/pet/pet.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
