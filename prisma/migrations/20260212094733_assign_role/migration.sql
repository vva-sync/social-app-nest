-- This migration assigns the "USER" role to all existing users in the database.

INSERT INTO "Role" ("user_id", "role")
SELECT "id", 'USER' FROM "User"

