"use server";

import { Prisma } from "@prisma/client";
import { SignupSchema, UpdatedUserSchema } from "../_schemas";
import prisma from "./db";
import { hash } from "bcryptjs";
import supabase, { bucketUrl } from "./supabase";
import { z } from "zod";
import { EmailSchema, UserIdSchema } from "../_schemas/singleSchemas";
import { isAuthenticated } from "../_utils/serverHelpers";

export async function getUserByEmail(email: string) {
  try {
    await isAuthenticated();

    const result = EmailSchema.safeParse(email);

    if (!result.success) throw new Error("Email failed in getUserByEmail");

    const parsedEmail = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email: parsedEmail,
      },
    });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    await isAuthenticated();

    const result = UserIdSchema.safeParse(id);

    if (!result.success) throw new Error("Id failed in getUserById");

    const parsedId = result.data;

    const user = await prisma.user.findUnique({
      where: {
        id: parsedId,
      },
    });

    return user;
  } catch (error) {
    return null;
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
    password: formData.get("password") || "",
    passwordConfirm: formData.get("passwordConfirm") || "",
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
    await isAuthenticated();

    // const fileBuffer =
    //   avatar?.size !== 0 && avatar
    //     ? Buffer.from(await avatar.arrayBuffer())
    //     : null;

    let imageUrl = null;

    if (avatar.size > 0) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${fullName}${userId}`, avatar);

      if (error && error.message !== "The resource already exists")
        throw new Error(error.message);

      imageUrl = bucketData?.path || `${fullName}${userId}`;
    }

    const user = await getUserById(userId);

    if (!user) throw new Error("Account not registered");

    const hashedPassword =
      password === "" ? user?.password : await hash(password, 12);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: fullName,
        password: hashedPassword,
        ...(imageUrl && { image: `${bucketUrl}${imageUrl}` }),
      },
    });
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
    await isAuthenticated();
    // const result = z.array(UserCreateManyInput).safeParse(data);

    // if (!result.success) throw new Error("Data failed in createGuests");

    // const parsedData = result.data;

    const allGuestUsers = await prisma.user.createMany({
      data: data,
      skipDuplicates: true,
    });

    return allGuestUsers;
  } catch (error) {
    console.error("Error creating guests:", error);
  }
}
