-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "dueDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Payment_status_dueDate_idx" ON "Payment"("status", "dueDate");
