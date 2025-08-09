import { Injectable } from '@nestjs/common';
import { CompanyCategoryScoreFindAllRepository } from '../repositories/company-category-score-find-all.repository';

@Injectable()
export class CompanyCategoryScoreFindAllService {
  constructor(
    private readonly companyCategoryScoreFindAllRepository: CompanyCategoryScoreFindAllRepository,
  ) {}

  async execute() {
    return this.companyCategoryScoreFindAllRepository.findAll({});
  }
}
