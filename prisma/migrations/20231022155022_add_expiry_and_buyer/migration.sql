-- AlterTable
ALTER TABLE "products" ADD COLUMN     "buyerId" TEXT,
ADD COLUMN     "expiryLength" INTEGER;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
