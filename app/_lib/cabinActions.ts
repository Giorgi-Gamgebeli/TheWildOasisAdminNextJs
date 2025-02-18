"use server";

import prisma from "./db";
import { revalidatePath } from "next/cache";
import { CreateCabinSchema, UpdateCabinSchema } from "../_schemas/cabinSchemas";
import supabase, { bucketUrl } from "./supabase";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { CabinsSchemaDatabase } from "../_schemas/databaseSchemas";
import { auth } from "@/auth";

export async function duplicateCabin(
  cabinId: z.infer<typeof CabinsSchemaDatabase.shape.id>
) {
  const result = CabinsSchemaDatabase.shape.id.safeParse(cabinId);

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    const fetchedData = await prisma.cabins.findUnique({
      where: {
        id: parsedId,
      },
    });

    const highestIdCabin = await prisma.cabins.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!fetchedData || !highestIdCabin) throw new Error("Can't find cabin");

    const { id: _, ...data } = fetchedData;

    await prisma.cabins.create({
      data: {
        ...data,
        name: `Copy of ${data.name}`,
        id: highestIdCabin.id + 1,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/cabins");
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
      error: "Validation failed",
    };

  const { image, name, ...data } = result.data;

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

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
  } catch (error) {
    console.error(error);
    if (typeof error === "object" && error !== null && "message" in error) {
      return { error: error.message };
    }
  } finally {
    revalidatePath("/cabins");
  }
}

export async function getAllCabins() {
  try {
    const allCabins = await prisma.cabins.findMany();

    return allCabins;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCabinsLength() {
  try {
    const cabinsLength = await prisma.cabins.count();

    return cabinsLength;
  } catch (error) {
    console.error(error);
    return [];
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
    cabinId: Number(formData.get("cabinId")),
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
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    let imageUrl = null;

    if (image && image.size > 0) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${name}${createId()}`, image);

      if (error) throw new Error(error.message);

      imageUrl = bucketData.path;
    }

    await prisma.cabins.update({
      where: { id: cabinId },
      data: {
        ...data,
        name,
        ...(imageUrl && { image: `${bucketUrl}${imageUrl}` }),
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/cabins");
  }
}

export async function deleteCabin(
  id: z.infer<typeof CabinsSchemaDatabase.shape.id>
) {
  const result = CabinsSchemaDatabase.shape.id.safeParse(id);

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    await prisma.cabins.delete({
      where: { id: parsedId },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/cabins");
  }
}
