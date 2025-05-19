"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { UpdateSettingsSchema } from "../_schemas/settingsSchema";
import { z } from "zod";
import { auth } from "@/auth";
import { handleErrorsOnServer } from "../_utils/helpers";

export async function getSettings() {
  try {
    const settings = await prisma.settings.findFirst();

    return settings;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSettings(
  data: z.infer<typeof UpdateSettingsSchema>,
) {
  const result = UpdateSettingsSchema.safeParse(data);

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (!result.success) throw new Error("Validation failed");

    const { field, value } = result.data;

    await prisma.settings.update({
      where: { id: 1 },
      data: {
        [field]: value,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    return handleErrorsOnServer(error);
  }
}
