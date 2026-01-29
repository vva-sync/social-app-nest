/*
  Warnings:

  - The primary key for the `UserPassword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserPassword` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `UserPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `UserPassword` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPassword" DROP CONSTRAINT "UserPassword_id_fkey";

-- AlterTable
ALTER TABLE "UserPassword" DROP CONSTRAINT "UserPassword_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPassword_user_id_key" ON "UserPassword"("user_id");

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
