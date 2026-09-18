-- CreateTable
CREATE TABLE "Lembrete" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lembrete_pkey" PRIMARY KEY ("id")
);
