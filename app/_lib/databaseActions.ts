"use server";

import { SignupSchema, UpdatedUserSchema } from "../_schemas";
import prisma from "./db";
import { hash } from "bcryptjs";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function signup(formData: FormData) {
  const formDataObj = {
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    fullName: formData.get("fullName") || "",
    passwordConfirm: formData.get("passwordConfirm") || "",
  };

  const result = SignupSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { email, password, fullName } = result.data;

  const existingUser = await getUserByEmail(email);
  try {
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

export async function updateUser(formData: FormData) {
  const formDataObj = {
    fullName: formData.get("fullName") || "",
    password: formData.get("password") || "DONTCHANGEPAS",
    passwordConfirm: formData.get("passwordConfirm") || "DONTCHANGEPAS",
    avatar: formData.get("avatar"),
    userId: formData.get("userId"),
  };

  const result = UpdatedUserSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { password, fullName, userId } = result.data;

  // const fileBuffer =
  //   avatar?.size !== 0 && avatar
  //     ? Buffer.from(await avatar.arrayBuffer())
  //     : null;

  try {
    const user = await getUserById(userId);

    if (!user) throw new Error("Account not registered");

    const hashedPassword =
      password === "DONTCHANGEPAS" ? user?.password : await hash(password, 12);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: fullName,
        password: hashedPassword,
        // avatar: fileBuffer
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
