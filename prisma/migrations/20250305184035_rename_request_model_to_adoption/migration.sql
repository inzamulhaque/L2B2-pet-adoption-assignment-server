/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Adoption` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDING', 'UNDER_PROCESS', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_petId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userEmail_fkey";

-- DropIndex
DROP INDEX "Adoption_petId_key";

-- AlterTable
ALTER TABLE "Adoption" DROP COLUMN "contactNumber",
ADD COLUMN     "status" "AdoptionStatus" NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "Adoption_pkey" PRIMARY KEY ("userEmail", "petId");

-- DropTable
DROP TABLE "Request";

-- DropEnum
DROP TYPE "RequestStatus";
