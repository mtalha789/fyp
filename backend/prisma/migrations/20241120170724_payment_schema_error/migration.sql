-- DropIndex
DROP INDEX "Payment_stripePaymentId_key";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "stripePaymentId" DROP NOT NULL;
