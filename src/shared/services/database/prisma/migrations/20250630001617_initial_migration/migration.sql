-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "ReviewVerificationStatus" AS ENUM ('NOT_VERIFIED', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR,
    "lastname" VARCHAR,
    "tax" VARCHAR,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR NOT NULL,
    "userId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportedCompany" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "tax" VARCHAR,
    "description" VARCHAR,
    "imageUrl" VARCHAR,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportedCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportedCompanyComment" (
    "id" SERIAL NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "ReportedCompanyComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "reviewerTypeId" INTEGER NOT NULL,
    "description" TEXT,
    "verificationStatus" "ReviewVerificationStatus" DEFAULT 'NOT_VERIFIED',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewerType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "ReviewerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewerTypeCategory" (
    "id" SERIAL NOT NULL,
    "reviewerTypeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ReviewerTypeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewDetail" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewReaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,
    "type" "ReactionType" NOT NULL DEFAULT 'LIKE',

    CONSTRAINT "ReviewReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySummary" (
    "id" SERIAL NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "calculatedSummary" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "CompanySummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySearch" (
    "id" SERIAL NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanySearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyCategoryScore" (
    "id" SERIAL NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "verifiedScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unverifiedScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "CompanyCategoryScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportedCompany_name_key" ON "ReportedCompany"("name");

-- CreateIndex
CREATE INDEX "ReviewReaction_reviewId_type_idx" ON "ReviewReaction"("reviewId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewReaction_userId_reviewId_key" ON "ReviewReaction"("userId", "reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySummary_reportedCompanyId_key" ON "CompanySummary"("reportedCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySearch_reportedCompanyId_key" ON "CompanySearch"("reportedCompanyId");

-- CreateIndex
CREATE INDEX "CompanyCategoryScore_reportedCompanyId_categoryId_idx" ON "CompanyCategoryScore"("reportedCompanyId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyCategoryScore_reportedCompanyId_categoryId_key" ON "CompanyCategoryScore"("reportedCompanyId", "categoryId");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportedCompanyComment" ADD CONSTRAINT "ReportedCompanyComment_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportedCompanyComment" ADD CONSTRAINT "ReportedCompanyComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerTypeId_fkey" FOREIGN KEY ("reviewerTypeId") REFERENCES "ReviewerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewerTypeCategory" ADD CONSTRAINT "ReviewerTypeCategory_reviewerTypeId_fkey" FOREIGN KEY ("reviewerTypeId") REFERENCES "ReviewerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewerTypeCategory" ADD CONSTRAINT "ReviewerTypeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewDetail" ADD CONSTRAINT "ReviewDetail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewDetail" ADD CONSTRAINT "ReviewDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewReaction" ADD CONSTRAINT "ReviewReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewReaction" ADD CONSTRAINT "ReviewReaction_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySummary" ADD CONSTRAINT "CompanySummary_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySearch" ADD CONSTRAINT "CompanySearch_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCategoryScore" ADD CONSTRAINT "CompanyCategoryScore_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCategoryScore" ADD CONSTRAINT "CompanyCategoryScore_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
