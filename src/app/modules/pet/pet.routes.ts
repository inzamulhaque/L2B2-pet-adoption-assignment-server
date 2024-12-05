import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import {
  petValidationSchema,
  updatePetValidationSchema,
} from "./pet.validation";
import {
  createNewPetForAdoption,
  getAllPet,
  getPetById,
  updatePet,
} from "./pet.controller";

const router: Router = Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(petValidationSchema),
  createNewPetForAdoption
);

router.patch(
  "/update-pet/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updatePetValidationSchema),
  updatePet
);

router.get("/", getAllPet);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  getPetById
);

const PetRoutes = router;
export default PetRoutes;
