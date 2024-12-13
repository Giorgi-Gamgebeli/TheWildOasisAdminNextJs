"use server";

import prisma from "./db";

export async function deleteReservations() {
  try {
    await prisma.reservations.deleteMany();
  } catch (error) {
    console.error(error);
  }
}
