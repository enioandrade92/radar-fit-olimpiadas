-- CreateTable
CREATE TABLE "competition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "athlete-result" (
    "id" SERIAL NOT NULL,
    "competition" TEXT NOT NULL,
    "athlete" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "measure" TEXT NOT NULL,
    "competitionId" INTEGER NOT NULL,

    CONSTRAINT "athlete-result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "athlete-result" ADD CONSTRAINT "athlete-result_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
