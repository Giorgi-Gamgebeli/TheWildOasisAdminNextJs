"use server";

import prisma from "./db";

export async function updateSettings(value: number, field: string) {
  try {
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        [field]: value,
      },
    });
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
