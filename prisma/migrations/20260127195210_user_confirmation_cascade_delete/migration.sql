-- DropForeignKey
ALTER TABLE "UserConfirmation" DROP CONSTRAINT "UserConfirmation_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserConfirmation" ADD CONSTRAINT "UserConfirmation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
