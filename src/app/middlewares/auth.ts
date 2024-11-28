import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }
    } catch (error) {
      next(error);
    }
  };
};
