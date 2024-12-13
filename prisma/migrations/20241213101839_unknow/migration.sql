/*
  Warnings:

  - You are about to drop the `Bookings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_cabinId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "countryFlag" TEXT,
ADD COLUMN     "nationalID" TEXT,
ADD COLUMN     "nationality" TEXT;

-- DropTable
DROP TABLE "Bookings";

-- CreateTable
CREATE TABLE "Reservations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "numNights" INTEGER NOT NULL,
    "numGuests" INTEGER NOT NULL,
    "cabinPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "hasBreakfast" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "observations" TEXT,
    "extrasPrice" INTEGER NOT NULL,
    "cabinId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_cabinId_fkey" FOREIGN KEY ("cabinId") REFERENCES "Cabins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
