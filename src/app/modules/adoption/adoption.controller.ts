import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../utils/catchAsync";
import { Request, Response } from "express";
import { requestForAdoptionService } from "./adoption.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const requestForAdoption = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const { id } = req.params;
    const { email } = req.user;
    const result = await requestForAdoptionService(id, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Request for Adoption Successfully!",
      success: true,
      data: result,
    });
  }
);

export { requestForAdoption };
