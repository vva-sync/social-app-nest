-- CreateTable
CREATE TABLE "Role" (
    "user_id" INTEGER NOT NULL,
    "role" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_user_id_key" ON "Role"("user_id");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
