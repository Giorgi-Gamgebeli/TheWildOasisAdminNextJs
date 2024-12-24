import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../_utils/constants";
import { NameSchema } from "./singleSchemas";

export const CreateCabinSchema = z
  .object({
    name: NameSchema,

    maxCapacity: z
      .number({
        message: "Only number is allowed",
      })
      .min(1, {
        message: "Capacity should be at least 1",
      })
      .refine((value) => value !== undefined && value !== null, {
        message: "This field is required",
      }),

    regularPrice: z
      .number({
        message: "Only number is allowed",
      })
      .min(1, {
        message: "Regular price should be at least 1",
      })
      .refine((value) => value !== undefined && value !== null, {
        message: "This field is required",
      }),

    discount: z
      .number({
        message: "Only number is allowed",
      })
      .min(0, { message: "Numbers lower than 0 not allowed" })
      .refine((value) => value !== undefined && value !== null, {
        message: "This field is required",
      }),

    description: z
      .string({
        message: "Only text is allowed",
      })
      .min(1, {
        message: "This field is required",
      }),

    image: z
      .instanceof(File)
      .refine(
        (file) => file instanceof File && file.size > 0,
        "Image is required",
      )
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported",
      ),
  })
  .superRefine(({ discount, regularPrice }, ctx) => {
    if (discount >= regularPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Discount should be less than regular price",
        path: ["discount"],
      });
    }
  });

export const UpdateCabinSchema = CreateCabinSchema._def.schema
  .partial({
    name: true,
    maxCapacity: true,
    regularPrice: true,
    discount: true,
    description: true,
  })
  .extend({
    image: z
      .instanceof(File)
      .refine((file) => file instanceof File, "Only image allowed")
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB`)
      .refine(
        (file) =>
          file?.size !== 0 ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true,
        "Only .jpg, .jpeg, .png and .webp formats are supported",
      )
      .optional(),
    cabinId: z.string(),
  });
