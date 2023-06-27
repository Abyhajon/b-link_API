/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translation_id_userId_key" ON "Translation"("id", "userId");
