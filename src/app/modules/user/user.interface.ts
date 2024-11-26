import { UserRole } from "@prisma/client";

export interface IUser {
  name?: string;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}
