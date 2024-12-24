import { z } from "zod";
import { CabinsSchemaDatabase } from "./databaseSchemas";
import { FileImageSchema } from "./index";

export const CreateCabinSchema = z
  .object({
    name: CabinsSchemaDatabase.shape.name,

    maxCapacity: CabinsSchemaDatabase.shape.maxCapacity,

    regularPrice: CabinsSchemaDatabase.shape.regularPrice,

    discount: CabinsSchemaDatabase.shape.discount,

    description: CabinsSchemaDatabase.shape.description,

    image: FileImageSchema.refine(
      (file) => file instanceof File && file.size > 0,
      "Image is required",
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
  .pick({
    name: true,
    maxCapacity: true,
    regularPrice: true,
    discount: true,
    description: true,
  })
  .extend({
    image: FileImageSchema.optional(),
    cabinId: CabinsSchemaDatabase.shape.id,
  });
