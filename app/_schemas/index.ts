import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignupSchema = z
  .object({
    fullName: z
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

    password: z
      .string({
        message: "Only text is allowed",
      })
      .min(8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: z.string({
      message: "Only text is allowed",
    }),
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
    fullName: z
      .string({
        message: "Only text is allowed",
      })
      .min(1, {
        message: "This field is required",
      }),

    password: z
      .string({
        message: "Only text is allowed",
      })
      .refine((password) => password === "" || password.length >= 8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: z.string({
      message: "Only text is allowed",
    }),

    avatar: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    }),

    userId: z.string(),
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
