/*
  Warnings:

  - You are about to drop the column `userId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belongsToId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_translatedText_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_userId_fkey";

-- DropIndex
DROP INDEX "Translation_id_userId_key";

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "userId",
ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bookmark";

-- CreateIndex
CREATE UNIQUE INDEX "Translation_id_belongsToId_key" ON "Translation"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
