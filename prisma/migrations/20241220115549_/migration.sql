/*
  Warnings:

  - You are about to drop the column `maxBookingLength` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `maxGuestsPerBooking` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `minimumBookingLength` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `maxGuestsPerReservation` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxReservationLength` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumReservationLength` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "maxBookingLength",
DROP COLUMN "maxGuestsPerBooking",
DROP COLUMN "minimumBookingLength",
ADD COLUMN     "maxGuestsPerReservation" INTEGER NOT NULL,
ADD COLUMN     "maxReservationLength" INTEGER NOT NULL,
ADD COLUMN     "minimumReservationLength" INTEGER NOT NULL;
