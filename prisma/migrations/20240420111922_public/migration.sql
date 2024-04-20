-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Account" (
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("username")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
