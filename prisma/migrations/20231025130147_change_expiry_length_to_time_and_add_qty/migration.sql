/*
  Warnings:

  - You are about to drop the column `expiryLength` on the `products` table. All the data in the column will be lost.
  - Added the required column `expiryTime` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "expiryLength",
ADD COLUMN     "endPrice" INTEGER,
ADD COLUMN     "expiryTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
