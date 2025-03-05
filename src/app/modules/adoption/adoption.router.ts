import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import {
  processAdoptionRequest,
  requestForAdoption,
} from "./adoption.controller";

const router: Router = Router();

router.post("/request/:id", auth(UserRole.USER), requestForAdoption);

router.post(
  "/process/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  processAdoptionRequest
);

const AdoptionRoutes = router;
export default AdoptionRoutes;
