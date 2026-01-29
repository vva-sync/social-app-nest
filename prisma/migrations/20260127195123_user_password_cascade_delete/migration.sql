-- DropForeignKey
ALTER TABLE "UserPassword" DROP CONSTRAINT "UserPassword_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
