-- AlterTable
ALTER TABLE "users" ADD COLUMN     "paotungId" TEXT,
ADD COLUMN     "paotungToken" TEXT,
ALTER COLUMN "lightBulbs" DROP NOT NULL;
