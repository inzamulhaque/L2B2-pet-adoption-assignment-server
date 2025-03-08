/*
  Warnings:

  - Added the required column `animalType` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('CAT', 'DOG', 'BIRD', 'RABBIT', 'OTHER');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "animalType" "AnimalType" NOT NULL;
