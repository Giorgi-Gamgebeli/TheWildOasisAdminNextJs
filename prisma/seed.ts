import { cabins } from "../app/_data/data-cabins";
import { guestUsers } from "../app/_data/data-guests";
import { reservations } from "../app/_data/data-reservations";
import { createId } from "@paralleldrive/cuid2";
import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

const settings: Prisma.SettingsCreateInput = {
  minimumReservationLength: 6,
  maxReservationLength: 90,
  maxGuestsPerReservation: 5,
  breakFastPrice: 15,
};

async function main() {
  const password = await hash("12345678", 12);
  await prisma.user.upsert({
    where: { email: "adminaccount@gmail.com" },
    update: {},
    create: {
      id: createId(),
      email: "adminaccount@gmail.com",
      name: "Giorgi Gamgebeli",
      role: "ADMIN",
      password,
    },
  });

  for (const cabin of cabins) {
    await prisma.cabins.create({
      data: cabin,
    });
  }

  let i = 0;
  for (const user of guestUsers) {
    if (i === 24) break;
    const newUser = await prisma.user.create({
      data: user,
    });

    await prisma.reservations.create({
      data: { ...reservations[i], userId: newUser.id },
    });
    i++;
  }
  await prisma.settings.create({
    data: settings,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
