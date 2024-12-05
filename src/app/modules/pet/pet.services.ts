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

const updatePetService = async (id: string, payload: Partial<IPet>) => {
  const result = prisma.pet.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

const getAllPetsService = async () => {
  const result = await prisma.pet.findMany();

  return result;
};

const getPetByIdService = async (id: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

export {
  createNewPetForAdoptionService,
  updatePetService,
  getAllPetsService,
  getPetByIdService,
};
