import { PrismaService } from '@shared/services/database/prisma/prisma.service';

export const getPrismaMock = () => ({
  provide: PrismaService,
  useFactory: () => {
    return {
      $queryRaw: () => {},
    };
  },
});
