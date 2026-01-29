-- CreateTable
CREATE TABLE "UserConfirmation" (
    "id" SERIAL NOT NULL,
    "activation_link" VARCHAR(255) NOT NULL,
    "is_activated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConfirmation_user_id_key" ON "UserConfirmation"("user_id");

-- AddForeignKey
ALTER TABLE "UserConfirmation" ADD CONSTRAINT "UserConfirmation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
