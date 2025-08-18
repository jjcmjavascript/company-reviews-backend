import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtUser } from '@shared/decorators/user.decorator';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewDeleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number, currentUser: JwtUser) {
    const review = await this.prismaService.review.findUnique({
      where: { id, userId: currentUser?.userId },
    });

    if (!review) {
      throw new BadRequestException('Review not found');
    }

    if (review.userId !== currentUser.userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this review',
      );
    }

    await this.prismaService.review.delete({
      where: { id },
    });
  }
}
