import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../utils/catchAsync";
import { Request, Response } from "express";
import {
  approvedAdoptionService,
  processAdoptionService,
  rejectedAdoptionService,
  requestForAdoptionService,
} from "./adoption.services";
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

const processAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await processAdoptionService(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption Request Under Process!",
      success: true,
      data: result,
    });
  }
);

const approvedAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await approvedAdoptionService(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption Request Approved!",
      success: true,
      data: result,
    });
  }
);

const rejectedAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await rejectedAdoptionService(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption Request Rejected!",
      success: true,
      data: result,
    });
  }
);

export {
  requestForAdoption,
  processAdoptionRequest,
  approvedAdoptionRequest,
  rejectedAdoptionRequest,
};
