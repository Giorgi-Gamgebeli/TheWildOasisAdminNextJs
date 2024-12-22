"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { LoginSchema } from "../_schemas";

export async function login(formData: FormData) {
  const formDataObj = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(formDataObj);

  if (!result.success) return { error: "Invalid credentials" };
  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    console.error(error);
    return { error: "Something went REALLY wrong!" };
  }
}
