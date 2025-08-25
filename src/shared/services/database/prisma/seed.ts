import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as fs from 'node:fs';
import { loadEnvFile } from 'node:process';
import { Roles } from '../../permission/types/roles.enum';
import { ReviewVerificationStatus } from '../../../enums/commons.enum';

console.log('----------->', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

const prisma = new PrismaClient();

const getCompaniesFromFile = () => {
  const fileContent = fs.readFileSync('seed.json', 'utf-8');
  return Object.values(
    JSON.parse(fileContent) as Record<
      string,
      { name: string; imageUrl: string }
    >,
  ).map((i) => ({
    name: i.name,
    imageUrl: i.imageUrl,
  }));
};

const getCategories = () => [
  { name: 'Interview' },
  { name: 'Salary' },
  { name: 'Culture' },
  { name: 'Management' },
  { name: 'Growth' },
  { name: 'Technology' },
];

const getReviewerTypes = () => [
  { name: 'System' },
  { name: 'Employee' },
  { name: 'Former Employee' },
  { name: 'Applicant' },
];

const getReviewerTypesCategories = (
  reviewerTypes: { id: number; name: string }[],
  categories: { id: number; name: string }[],
) => {
  const categoriesByType = reviewerTypes.map((reviewerType) => {
    const categoryIds =
      reviewerType.name === 'Applicant'
        ? categories
            .filter((cat) => ['Interview', 'Salary'].includes(cat.name))
            .map((cat) => cat.id)
        : categories.map((cat) => cat.id);

    return { reviewerTypeId: reviewerType.id, categoryIds };
  });

  return categoriesByType.flatMap((entry) =>
    entry.categoryIds.map((catId) => ({
      categoryId: catId,
      reviewerTypeId: entry.reviewerTypeId,
    })),
  );
};

const getReview = (
  reportedCompanies: { id: number; name: string }[],
  userId: number,
  reviewerTypeId: number,
) => {
  return reportedCompanies.map((company) => ({
    userId,
    reviewerTypeId,
    reportedCompanyId: company.id,
    verificationStatus: ReviewVerificationStatus.NOT_VERIFIED,
  }));
};

const getReviewDetails = (
  reviews: { id: number }[],
  categories: { id: number; name: string }[],
) => {
  return reviews.flatMap((review) =>
    categories.map((category) => ({
      reviewId: review.id,
      categoryId: category.id,
      score: 5,
    })),
  );
};

const getCompaniesScore = (
  reportedCompanies: { id: number }[],
  categories: { id: number; name: string }[],
) => {
  const companyCategoryScores: {
    reportedCompanyId: number;
    categoryId: number;
    verifiedScore: number;
    unverifiedScore: number;
  }[] = [];

  reportedCompanies.forEach((company) => {
    categories.forEach((category) => {
      companyCategoryScores.push({
        reportedCompanyId: company.id,
        categoryId: category.id,
        verifiedScore: 5,
        unverifiedScore: 5,
      });
    });
  });

  return companyCategoryScores;
};

async function main() {
  const checkIfFileExists = fs.existsSync('seed.json');
  const userCount = await prisma.user.count();

  if (!checkIfFileExists || userCount > 0) {
    console.info('Seed file does not exist or database is already seeded 🌱');
    return;
  }

  await prisma.$transaction(async (tx) => {
    const toHash = getCompaniesFromFile();
    const hashedPassword = await argon2.hash(process.env.SYSTEM_PASSWORD ?? '');

    const reportedCompanies = await tx.reportedCompany.createManyAndReturn({
      data: toHash,
      skipDuplicates: true,
    });

    const categories = await tx.category.createManyAndReturn({
      data: getCategories(),
      skipDuplicates: true,
    });

    const reviewerTypes = await tx.reviewerType.createManyAndReturn({
      data: getReviewerTypes(),
      skipDuplicates: true,
    });

    const user = await tx.user.create({
      data: {
        name: 'System',
        email: 'itsnotjs@gmail.com',
      },
    });

    const reviewerTypesCategories = getReviewerTypesCategories(
      reviewerTypes,
      categories,
    );

    const system = reviewerTypes.find((type) => type.name === 'System');

    const reviewRaws = getReview(reportedCompanies, user.id, system.id);

    await Promise.all([
      tx.password.create({
        data: {
          userId: user.id,
          password: hashedPassword,
        },
      }),

      tx.userRole.create({
        data: {
          name: Roles.Admin,
          userId: user.id,
        },
      }),

      tx.reviewerTypeCategory.createMany({
        data: reviewerTypesCategories,
        skipDuplicates: true,
      }),
    ]);

    await tx.review.createMany({
      data: reviewRaws,
      skipDuplicates: true,
    });

    const insertedReviews = await tx.review.findMany({
      where: { userId: user.id, reviewerTypeId: system.id },
    });

    const reviewDetails = getReviewDetails(insertedReviews, categories);

    await tx.reviewDetail.createMany({
      data: reviewDetails,
      skipDuplicates: true,
    });

    const companyCategoryScores = getCompaniesScore(
      reportedCompanies,
      categories,
    );

    await tx.companyCategoryScore.createMany({
      data: companyCategoryScores,
      skipDuplicates: true,
    });
  });

  console.info('Database seeded successfully! 🌱🌱🌱🌱🌱');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
