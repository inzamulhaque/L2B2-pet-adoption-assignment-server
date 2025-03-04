import { PetStatus, RequestStatus } from "@prisma/client";
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

    const adoptionRequest = await transactionClient.request.create({
      data: {
        petId: pet.id,
        userEmail: email,
        status: RequestStatus.PENDING,
      },
    });
    return adoptionRequest;
  });

  return result;
};

export { requestForAdoptionService };
