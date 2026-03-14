/*
  Warnings:

  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "description" TEXT,
ADD COLUMN     "paymentType" TEXT NOT NULL;
