-- CreateEnum
CREATE TYPE "RiderStatus" AS ENUM ('NOT', 'APPLIED', 'SERVING');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "riderShift" TEXT,
ADD COLUMN     "riderStatus" "RiderStatus" NOT NULL DEFAULT 'NOT';
