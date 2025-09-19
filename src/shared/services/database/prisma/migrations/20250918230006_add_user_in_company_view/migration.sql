/*
  Warnings:

  - Added the required column `userId` to the `CompanySearch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."CompanySearch_reportedCompanyId_key";

-- AlterTable
ALTER TABLE "public"."CompanySearch" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CompanySearch" ADD CONSTRAINT "CompanySearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
