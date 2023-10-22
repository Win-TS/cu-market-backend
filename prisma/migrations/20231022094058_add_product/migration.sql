-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
