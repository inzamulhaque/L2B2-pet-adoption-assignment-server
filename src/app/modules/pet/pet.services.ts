import prisma from "../../../utils/prisma";
import { IPet, PetStatus } from "./pet.interface";

const createNewPetForAdoptionService = async (payload: IPet) => {
  const result = prisma.pet.create({
    data: {
      ...payload,
      status: PetStatus.AVAILABLE,
    },
  });

  return result;
};

export { createNewPetForAdoptionService };
