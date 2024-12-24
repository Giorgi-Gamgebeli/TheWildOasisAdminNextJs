"use server";

import { Prisma } from "@prisma/client";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { CreateCabinSchema, UpdateCabinSchema } from "../_schemas/cabinSchemas";
import supabase, { bucketUrl } from "./supabase";
import { createId } from "@paralleldrive/cuid2";
import { isAuthenticated } from "../_utils/serverHelpers";

export async function deleteCabins() {
  try {
    await isAuthenticated();

    await prisma.cabins.deleteMany();
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
  }
}

// TODO
export async function createCabins(data: Prisma.CabinsCreateInput[]) {
  try {
    await isAuthenticated();

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

  try {
    await isAuthenticated();

    const { data: bucketData, error } = await supabase.storage
      .from("images-bucket")
      .upload(`${name}${createId()}`, image);

    if (error) throw new Error(error.message);

    await prisma.cabins.create({
      data: {
        ...data,
        name: name,
        image: `${bucketUrl}${bucketData.path}`,
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

  // const fileBuffer =
  //   image?.size !== 0 && image
  //     ? Buffer.from(await image.arrayBuffer())
  //     : undefined;

  try {
    await isAuthenticated();

    let imageUrl = null;

    if (image && image.size > 0) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${name}${createId()}`, image);

      if (error) throw new Error(error.message);

      imageUrl = bucketData.path;
    }

    await prisma.cabins.update({
      where: { id: +cabinId },
      data: {
        ...data,
        name,
        ...(imageUrl && { image: `${bucketUrl}${imageUrl}` }),
      },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

// TODO
export async function duplicateCabin(cabinId: number) {
  try {
    await isAuthenticated();

    const fetchedData = await prisma.cabins.findUnique({
      where: {
        id: cabinId,
      },
    });

    if (!fetchedData) throw new Error("Can't find cabin");

    const { id: _, ...data } = fetchedData;

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

// TODO
export async function deleteCabin(id: number) {
  try {
    await isAuthenticated();

    await prisma.cabins.delete({
      where: { id },
    });
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
