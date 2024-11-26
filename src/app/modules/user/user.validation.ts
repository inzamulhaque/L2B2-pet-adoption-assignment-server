import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().optional(),
  username: z
    .string({
      required_error: "Please Enter Your User Name",
    })
    .regex(/^[a-z0-9_]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, and underscores",
    })
    .min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]).optional(),
});
