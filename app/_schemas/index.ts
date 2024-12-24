import { z } from "zod";
import {
  EmailSchema,
  NameSchema,
  PasswordConfirmSchema,
  UserIdSchema,
} from "./singleSchemas";

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignupSchema = z
  .object({
    fullName: NameSchema,

    email: EmailSchema,

    password: z
      .string({
        message: "Only text is allowed",
      })
      .min(8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: PasswordConfirmSchema,
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export const UpdatedUserSchema = z
  .object({
    fullName: NameSchema,

    password: z
      .string({
        message: "Only text is allowed",
      })
      .refine((password) => password === "" || password.length >= 8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: PasswordConfirmSchema,

    avatar: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    }),

    userId: UserIdSchema,
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });
