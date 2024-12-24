"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { isAuthenticated } from "../_utils/serverHelpers";

export async function updateSettings(value: number, field: string) {
  try {
    await isAuthenticated();

    await prisma.settings.update({
      where: { id: 1 },
      data: {
        [field]: value,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    return settings;
  } catch (error) {
    console.error(error);
  }
}
