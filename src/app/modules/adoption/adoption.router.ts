import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import {
  approvedAdoptionRequest,
  processAdoptionRequest,
  rejectedAdoptionRequest,
  requestForAdoption,
} from "./adoption.controller";

const router: Router = Router();

router.post("/request/:id", auth(UserRole.USER), requestForAdoption);

router.post(
  "/process/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  processAdoptionRequest
);

router.post(
  "/approved/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  approvedAdoptionRequest
);

router.post(
  "/rejected/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  rejectedAdoptionRequest
);

const AdoptionRoutes = router;
export default AdoptionRoutes;
