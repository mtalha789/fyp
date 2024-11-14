/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `riderId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `DeliveryPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Customer', 'Seller', 'Rider');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_riderId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_deliveryPersonId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "restaurantId",
DROP COLUMN "riderId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "riderVehicle" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Customer';

-- DropTable
DROP TABLE "DeliveryPerson";

-- CreateTable
CREATE TABLE "RestaurantAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RestaurantAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RestaurantAddress" ADD CONSTRAINT "RestaurantAddress_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
