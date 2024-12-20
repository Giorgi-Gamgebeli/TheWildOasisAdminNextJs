"use server";

import { Prisma } from "@prisma/client";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import imagekit from "./imagekit";
import { CreateCabinSchema, UpdateCabinSchema } from "../_schemas/cabinSchemas";

export async function deleteCabins() {
  try {
    await prisma.cabins.deleteMany();
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
  }
}

export async function createCabins(data: Prisma.CabinsCreateInput[]) {
  try {
    await prisma.cabins.createMany({
      data: data,
    });
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCabins() {
  try {
    const allCabins = await prisma.cabins.findMany();

    return allCabins;
  } catch (error) {
    console.error(error);
  }
}

export async function createCabin(formData: FormData) {
  const formDataObj = {
    name: formData.get("name"),
    maxCapacity: Number(formData.get("maxCapacity")),
    regularPrice: Number(formData.get("regularPrice")),
    discount: Number(formData.get("discount")),
    description: formData.get("description"),
    image: formData.get("image"),
  };

  const result = CreateCabinSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { image, name, ...data } = result.data;

  const fileBuffer = Buffer.from(await image.arrayBuffer());

  try {
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: `${name}-image`,
    });

    await prisma.cabins.create({
      data: {
        ...data,
        name: name,
        image: response.url,
      },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function updateCabin(formData: FormData) {
  const formDataObj = {
    name: formData.get("name"),
    maxCapacity: Number(formData.get("maxCapacity")),
    regularPrice: Number(formData.get("regularPrice")),
    discount: Number(formData.get("discount")),
    description: formData.get("description"),
    image: formData.get("image"),
    cabinId: formData.get("cabinId"),
  };

  const result = UpdateCabinSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { image, cabinId, name, ...data } = result.data;

  const fileBuffer =
    image?.size !== 0 && image
      ? Buffer.from(await image.arrayBuffer())
      : undefined;

  try {
    let imageUrl;

    if (fileBuffer && image && image.size > 0) {
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: `${name}-image`,
      });

      imageUrl = response.url;
    } else {
      const cabin = await prisma.cabins.findUnique({
        where: { id: +cabinId },
      });

      imageUrl = cabin?.image;
    }

    await prisma.cabins.update({
      where: { id: +cabinId },
      data: {
        ...data,
        name,
        image: imageUrl,
      },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function duplicateCabin(cabinId: number) {
  try {
    const data = await prisma.cabins.findUnique({
      where: {
        id: cabinId,
      },
    });

    if (!data) throw new Error("Can't find cabin");

    await prisma.cabins.create({
      data: {
        ...data,
        name: `Copy of ${data.name}`,
      },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteCabin(id: number) {
  try {
    await prisma.cabins.delete({
      where: { id },
    });
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
