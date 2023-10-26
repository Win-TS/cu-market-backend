/*
  Warnings:

  - The `image` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `lightBulbs` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image",
ADD COLUMN     "image" JSONB[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lightBulbs" INTEGER NOT NULL;
