"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LoginSchema, SignupSchema } from "../_schemas/authSchemas";
import prisma from "./db";
import { cabins } from "../_data/data-cabins";
import { revalidatePath } from "next/cache";
import { fixedReservations } from "../_utils/helpers";
import { hash } from "bcryptjs";
import { z } from "zod";

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

export async function signup(values: z.infer<typeof SignupSchema>) {
  const result = SignupSchema.safeParse(values);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { email, password, fullName } = result.data;

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser) return { error: "Email already in use" };

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function uploadAll() {
  try {
    await prisma.reservations.deleteMany();
    await prisma.cabins.deleteMany();

    const users = await prisma.user.findMany();

    const finalReservations = fixedReservations(users);

    await prisma.cabins.createMany({
      data: cabins,
    });
    await prisma.reservations.createMany({
      data: finalReservations,
    });

    revalidatePath("/dashboard");
    revalidatePath("/reservations");
    revalidatePath("/cabins");
  } catch (error) {
    console.log(error);
  }
}
