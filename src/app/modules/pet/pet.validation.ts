import { z } from "zod";

const petValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),

    photo: z.string().url("Photo must be a valid URL"),

    briefDescription: z.string().min(1, "Brief description is required"),

    age: z.number().int().min(0, "Age must be a positive integer"),

    breed: z.string().min(1, "Breed is required"),

    location: z.string().min(1, "Location is required"),

    healthStatus: z
      .enum(["VACCINATED", "NEUTERED", "NOT_AVAILABLE"])
      .optional(),

    status: z
      .enum(["AVAILABLE", "UNAVAILABLE", "DELETED", "REQUESTED", "ADOPTED"])
      .optional(),
  }),
});

const updatePetValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    photo: z.string().url("Photo must be a valid URL").optional(),
    briefDescription: z
      .string()
      .min(1, "Brief description is required")
      .optional(),
    age: z.number().int().min(0, "Age must be a positive integer").optional(),
    breed: z.string().min(1, "Breed is required").optional(),
    location: z.string().min(1, "Location is required").optional(),
    healthStatus: z
      .enum(["VACCINATED", "NEUTERED", "NOT_AVAILABLE"])
      .optional(),
    status: z
      .enum(["AVAILABLE", "UNAVAILABLE", "DELETED", "REQUESTED", "ADOPTED"])
      .optional(),
  }),
});

export { petValidationSchema, updatePetValidationSchema };
