/*
  Warnings:

  - Changed the type of `role` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role",
ADD COLUMN     "role" "RoleType" NOT NULL;
