import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { PetValidationSchema } from "./pet.validation";
import { createNewPetForAdoption } from "./pet.controller";

const router: Router = Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(PetValidationSchema),
  createNewPetForAdoption
);

const PetRoutes = router;
export default PetRoutes;
