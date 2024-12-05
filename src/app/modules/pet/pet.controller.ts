import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import {
  createNewPetForAdoptionService,
  getAllPetsService,
  getPetByIdService,
  updatePetService,
} from "./pet.services";

const createNewPetForAdoption = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createNewPetForAdoptionService(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Pet Created Successfully!",
      success: true,
      data: result,
    });
  }
);

const updatePet = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await updatePetService(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Pet Updated Successfully!",
    success: true,
    data: result,
  });
});

const getAllPet = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllPetsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieve All Pet Successfully!",
    success: true,
    data: result,
  });
});

const getPetById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getPetByIdService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieve Pet Successfully!",
    success: true,
    data: result,
  });
});

export { createNewPetForAdoption, updatePet, getAllPet, getPetById };
