"use server";

import prisma from "./db";
import {
  revalidatePath,
  revalidateTag,
  unstable_cache as cache,
} from "next/cache";
import { getToday, handleErrorsOnServer } from "../_utils/helpers";
import { z } from "zod";
import { ReservationsSchemaDatabase } from "../_schemas/databaseSchemas";
import { UpdateCheckinSchema } from "../_schemas/reservationSchemas";
import { auth } from "@/auth";

export const getReservationsWithMoreInfo = cache(
  async () => {
    try {
      const reservations = await prisma.reservations.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          cabin: {
            select: {
              name: true,
            },
          },
        },
      });

      return reservations;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  undefined,
  {
    tags: ["reservations"],
  },
);

export async function getReservation(
  id: z.infer<typeof ReservationsSchemaDatabase.shape.id>,
) {
  const result = ReservationsSchemaDatabase.shape.id.safeParse(id);

  try {
    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    const reservation = await prisma.reservations.findUnique({
      where: { id: parsedId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            countryFlag: true,
            nationalID: true,
            nationality: true,
          },
        },
        cabin: {
          select: {
            name: true,
          },
        },
      },
    });

    return reservation;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllReservations() {
  try {
    const reservations = await prisma.reservations.findMany();

    return reservations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllStays() {
  try {
    const stays = await prisma.reservations.findMany({
      where: {
        user: {
          role: "GUEST",
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return stays;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStaysTodayActivity() {
  try {
    const activities = await prisma.reservations.findMany({
      where: {
        OR: [
          {
            status: "unconfirmed",
            startDate: getToday(),
          },
          {
            status: "checked_in",
            endDate: getToday(),
          },
        ],
        user: {
          role: "GUEST",
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: {
          select: {
            name: true,
            nationality: true,
            nationalID: true,
            countryFlag: true,
          },
        },
      },
    });

    return activities;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateCheckout(
  id: z.infer<typeof ReservationsSchemaDatabase.shape.id>,
) {
  const result = ReservationsSchemaDatabase.shape.id.safeParse(id);

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    await prisma.reservations.update({
      where: {
        id: parsedId,
      },
      data: {
        status: "checked_out",
      },
    });
  } catch (error) {
    return handleErrorsOnServer(error);
  } finally {
    revalidatePath("/dashboard");
    revalidateTag("reservations");
  }
}

export async function updateCheckin(data: z.infer<typeof UpdateCheckinSchema>) {
  const result = UpdateCheckinSchema.safeParse(data);

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (!result.success) throw new Error("Validation failed");

    const { id, extrasPrice, hasBreakfast, totalPrice } = result.data;

    await prisma.reservations.update({
      where: {
        id,
      },
      data: { hasBreakfast, extrasPrice, totalPrice, status: "checked_in" },
    });
  } catch (error) {
    return handleErrorsOnServer(error);
  } finally {
    revalidatePath("/dashboard");
    revalidatePath("/reservations");
  }
}

export async function deleteReservation(
  id: z.infer<typeof ReservationsSchemaDatabase.shape.id>,
) {
  const result = ReservationsSchemaDatabase.shape.id.safeParse(id);

  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    await prisma.reservations.delete({
      where: {
        id: parsedId,
      },
    });
  } catch (error) {
    return handleErrorsOnServer(error);
  } finally {
    revalidatePath("/reservations");
  }
}
