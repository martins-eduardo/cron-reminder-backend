/*
  Warnings:

  - You are about to drop the `Lembrete` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Lembrete";

-- CreateTable
CREATE TABLE "reminder" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reminder_pkey" PRIMARY KEY ("id")
);
