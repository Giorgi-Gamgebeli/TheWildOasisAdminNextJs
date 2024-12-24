"use server";

import { Prisma } from "@prisma/client";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { getToday } from "../_utils/helpers";
import { isAuthenticated } from "../_utils/serverHelpers";

export async function deleteReservations() {
  try {
    await isAuthenticated();

    await prisma.reservations.deleteMany();
    revalidatePath("/reservations");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteReservation(id: number) {
  try {
    await isAuthenticated();

    await prisma.reservations.delete({
      where: {
        id,
      },
    });

    revalidatePath("/reservations");
  } catch (error) {
    console.error(error);
  }
}

export async function createDummyReservations(
  data: Prisma.ReservationsCreateManyInput[],
) {
  try {
    await isAuthenticated();

    await prisma.reservations.createMany({
      data: data,
    });
    revalidatePath("/reservations");
  } catch (error) {
    console.error(error);
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
        user: true,
      },
    });

    return stays;
  } catch (error) {
    console.error(error);
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
            status: "checked-in",
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
  }
}

export async function updateCheckout(id: number) {
  try {
    await isAuthenticated();

    await prisma.reservations.update({
      where: {
        id,
      },
      data: {
        status: "checked-out",
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    return { error: "There was an error while checking out" };
  }
}

type UpdateCheckinTypes = {
  id: number;
  hasBreakfast?: true;
  extrasPrice?: number;
  totalPrice?: number;
};

export async function updateCheckin({
  id,
  hasBreakfast,
  extrasPrice,
  totalPrice,
}: UpdateCheckinTypes) {
  try {
    await isAuthenticated();

    await prisma.reservations.update({
      where: {
        id,
      },
      data: { hasBreakfast, extrasPrice, totalPrice, status: "checked-in" },
    });
  } catch (error) {
    console.error(error);
    return { error: "There was an error while checking in" };
  }
}

export async function getAllReservationsWithCount() {
  try {
    const count = await prisma.reservations.count();

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

    return { reservations, count };
  } catch (error) {
    console.error(error);
    return { reservations: [], count: 0 };
  }
}

export async function getReservation(id: number) {
  try {
    const reservation = await prisma.reservations.findUnique({
      where: { id },
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
  }
}
