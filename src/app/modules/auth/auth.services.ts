import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";
import { ILoginInput } from "./auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { generateToken } from "../../../utils/jwt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const userLoginService = async (payload: ILoginInput) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Password incorrect!");
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export { userLoginService };
