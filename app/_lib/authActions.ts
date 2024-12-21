"use server";

import { Prisma } from "@prisma/client";
import { SignupSchema, UpdatedUserSchema } from "../_schemas";
import prisma from "./db";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import supabase, { bucketUrl } from "./supabase";

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

  try {
    const existingUser = await getUserByEmail(email);

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

  const { password, fullName, userId, avatar } = result.data;

  try {
    let imageUrl;
    if (avatar instanceof File) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${fullName}${userId}`, avatar);

      if (error) throw new Error(error.message);

      imageUrl = bucketData.path;
    }

    const user = await getUserById(userId);

    if (!user) throw new Error("Account not registered");

    const hashedPassword =
      password === "DONTCHANGEPAS" ? user?.password : await hash(password, 12);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: fullName,
        password: hashedPassword,
        image: `${bucketUrl}${imageUrl}` || undefined,
      },
    });

    revalidatePath("/account");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function getAllGuests() {
  try {
    const allGuestUsers = await prisma.user.findMany({
      where: { role: "GUEST" },
      orderBy: { id: "asc" },
    });

    return allGuestUsers;
  } catch (error) {
    console.error(error);
  }
}

export async function createGuests(data: Prisma.UserCreateManyInput[]) {
  try {
    const allGuestUsers = await prisma.user.createMany({
      data,
      skipDuplicates: true,
    });

    return allGuestUsers;
  } catch (error) {
    console.error("Error creating guests:", error);
  }
}
