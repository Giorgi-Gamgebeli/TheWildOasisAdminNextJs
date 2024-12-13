"use server";

import { Prisma } from "@prisma/client";
import prisma from "./db";

export async function deleteCabins() {
  try {
    await prisma.cabins.deleteMany();
  } catch (error) {
    console.error(error);
  }
}

export async function createCabins(data: Prisma.CabinsCreateInput) {
  try {
    await prisma.cabins.createMany({
      data: data,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCabins() {
  try {
    const allCabins = await prisma.cabins.findMany({
      select: { id: true },
      orderBy: { id: "asc" },
    });

    return allCabins;
  } catch (error) {
    console.error(error);
  }
}
