import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import {
  deleteUserByIdService,
  getUserByIdService,
  getUserService,
} from "./admin.services";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import pick from "../../../utils/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await getUserService(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Data Fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getUserByIdService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieve User Successfully!",
    success: true,
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteUserByIdService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User Deleted Successfully!",
    success: true,
    data: result,
  });
});

export { getAllUser, getUserById, deleteUserById };
