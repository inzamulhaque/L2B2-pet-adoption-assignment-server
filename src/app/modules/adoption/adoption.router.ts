import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { requestForAdoption } from "./adoption.controller";

const router: Router = Router();

router.post("/request/:id", auth(UserRole.USER), requestForAdoption);

const AdoptionRoutes = router;
export default AdoptionRoutes;
