-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_studentId_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
