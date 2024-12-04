import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { createNewPetForAdoptionService } from "./pet.services";

const createNewPetForAdoption = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createNewPetForAdoptionService(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Admin Created Successfully!",
      success: true,
      data: result,
    });
  }
);

export { createNewPetForAdoption };
