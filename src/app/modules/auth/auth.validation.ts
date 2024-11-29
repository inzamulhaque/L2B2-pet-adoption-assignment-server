import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({
      required_error: "Please Enter Your Password",
    }),
  }),
});
