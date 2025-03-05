import { PetStatus, AdoptionStatus } from "@prisma/client";
import prisma from "../../../utils/prisma";

const requestForAdoptionService = async (id: string, email: string) => {
  const pet = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
      status: PetStatus.AVAILABLE,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.pet.update({
      where: {
        id: pet.id,
      },
      data: {
        status: PetStatus.REQUESTED,
      },
    });

    const adoptionRequest = await transactionClient.adoption.create({
      data: {
        petId: pet.id,
        userEmail: email,
        status: AdoptionStatus.PENDING,
      },
    });
    return adoptionRequest;
  });

  return result;
};

const processAdoptionService = async (id: string) => {
  await prisma.adoption.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const adoptionRequest = await prisma.adoption.update({
    where: {
      id: id,
    },
    data: {
      status: AdoptionStatus.UNDER_PROCESS,
    },
    include: {
      pet: true,
      user: {
        select: {
          email: true,
          name: true,
          status: true,
          role: true,
          username: true,
          Adoption: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return adoptionRequest;
};

export { requestForAdoptionService, processAdoptionService };
