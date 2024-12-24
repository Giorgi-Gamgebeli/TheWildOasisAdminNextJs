import { z } from "zod";

export const EmailSchema = z
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
  });

export const NameSchema = z
  .string({
    message: "Only text is allowed",
  })
  .min(1, {
    message: "This field is required",
  });

export const PasswordConfirmSchema = z.string({
  message: "Only text is allowed",
});

export const UserIdSchema = z.string();
