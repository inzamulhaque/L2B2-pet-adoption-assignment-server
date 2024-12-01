import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import prisma from "../../../utils/prisma";
import { UserRole } from "@prisma/client";

const createNewAdminServices = async (payload: IUser) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  const { password, ...others } = result;

  return others;
};

const createNewUserService = async (payload: IUser) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      role: UserRole.USER,
    },
  });

  const { password, ...others } = result;

  return others;
};

const getMyProfileService = async (payload: { email: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const { password, ...others } = user;

  return others;
};

export { createNewAdminServices, createNewUserService, getMyProfileService };
