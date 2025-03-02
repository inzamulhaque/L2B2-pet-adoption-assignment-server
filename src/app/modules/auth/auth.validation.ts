import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({
      required_error: "Please Enter Your Password",
    }),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Please Enter Your Old Password",
    }),

    newPassword: z.string({
      required_error: "Please Enter Your New Password",
    }),

    confirmPassword: z.string({
      required_error: "Please Enter Your Confirm Password",
    }),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
  }),
});

export const verifyOTPValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z
      .number()
      .min(100000, { message: "invalid OTP" })
      .max(999999, { message: "invalid OTP" }),
  }),
});
