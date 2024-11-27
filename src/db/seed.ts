import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { UserRole } from "@prisma/client";
import config from "../config";

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exist!");
    }

    if (!isSuperAdminExist) {
      const hashedPassword: string = await bcrypt.hash(
        config.super_admin.password as string,
        12
      );

      const superAdmin = await prisma.user.create({
        data: {
          email: config.super_admin.email as string,
          password: hashedPassword,
          role: UserRole.SUPER_ADMIN,
          username: config.super_admin.username as string,
          name: config.super_admin.name as string,
        },
      });

      console.log(superAdmin);
    }
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
};

export default seedSuperAdmin;
