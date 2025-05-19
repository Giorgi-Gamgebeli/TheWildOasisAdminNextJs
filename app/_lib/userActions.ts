"use server";

import { UpdatedUserSchema } from "../_schemas/authSchemas";
import prisma from "./db";
import { hash } from "bcryptjs";
import supabase, { bucketUrl } from "./supabase";
import { createId } from "@paralleldrive/cuid2";
import { auth } from "@/auth";
import { handleErrorsOnServer } from "../_utils/helpers";

export async function updateUser(formData: FormData) {
  const formDataObj = {
    fullName: formData.get("fullName") || "",
    password: formData.get("password") || "",
    passwordConfirm: formData.get("passwordConfirm") || "",
    avatar: formData.get("avatar"),
    userId: formData.get("userId"),
  };

  const result = UpdatedUserSchema.safeParse(formDataObj);

  if (!result.success) throw new Error("Validation failed on server");

  const { password, fullName, userId, avatar } = result.data;

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (session.user.id !== userId) throw new Error("No permission!");

    // const fileBuffer =
    //   avatar?.size !== 0 && avatar
    //     ? Buffer.from(await avatar.arrayBuffer())
    //     : null;

    let imageUrl = null;

    if (avatar.size > 0) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${fullName}${createId()}`, avatar);

      if (error && error.message !== "The resource already exists")
        throw new Error(error.message);

      imageUrl = bucketData?.path;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

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
    return handleErrorsOnServer(error);
  }
}
