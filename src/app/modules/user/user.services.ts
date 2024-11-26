import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import prisma from "../../../utils/prisma";
import { UserRole } from "@prisma/client";

const createNewUserService = async (payload: IUser) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      role: UserRole.USER,
    },
  });

  return result;
};

export { createNewUserService };
