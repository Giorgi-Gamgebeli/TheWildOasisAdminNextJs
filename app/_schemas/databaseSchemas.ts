import { z } from "zod";

export const UserRoleEnumDatabase = z.enum(["ADMIN", "GUEST"]);

export const UserSchemaDatabase = z.object({
  id: z.string(),

  name: z
    .string({
      message: "Only text is allowed",
    })
    .min(1, {
      message: "This field is required",
    }),

  email: z
    .string({
      message: "Only text is allowed",
    })
    .min(1, {
      message: "This field is required",
    })
    .email({
      message: "Please provide a valid email address",
    })
    .regex(/\S+@\S+\.\S+/, {
      message: "Please provide a valid email address",
    }),

  password: z.string().nullable(),

  role: UserRoleEnumDatabase.optional().default("GUEST"),

  image: z.string().nullable(),

  emailVerified: z.date().nullable(),

  nationalID: z.string().nullable(),

  nationality: z.string().nullable(),

  countryFlag: z.string().nullable(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

export const CabinsSchemaDatabase = z.object({
  id: z.number(),

  createdAt: z.date(),

  name: z
    .string({
      message: "Only text is allowed",
    })
    .min(1, {
      message: "Should be at least 1 character",
    }),

  maxCapacity: z
    .number({
      message: "Only number is allowed",
    })
    .min(1, {
      message: "Capacity should be at least 1",
    }),

  regularPrice: z
    .number({
      message: "Only number is allowed",
    })
    .min(1, {
      message: "Regular price should be at least 1",
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

  image: z.string({
    message: "Only text is allowed",
  }),
});

export const ReservationsSchemaDatabase = z.object({
  id: z.number(),

  createdAt: z.date(),

  startDate: z.date(),

  endDate: z.date(),

  numNights: z.number().nullable(),

  numGuests: z.number(),

  cabinPrice: z.number().nullable(),

  totalPrice: z.number().nullable(),

  status: z.enum(["checked_in", "checked_out", "unconfirmed"]),

  hasBreakfast: z.boolean(),

  isPaid: z.boolean(),

  observations: z.string().nullable(),

  extrasPrice: z.number().nullable(),

  cabinId: z.number(),

  userId: z.string(),
});

export const SettingsSchemaDatabase = z.object({
  id: z.number(),

  createdAt: z.date(),

  minimumReservationLength: z.number(),

  maxReservationLength: z.number(),

  maxGuestsPerReservation: z.number(),

  breakFastPrice: z.number(),
});
