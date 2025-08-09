import { faker } from '@faker-js/faker';
import { ReportedCompany } from '@shared/entities/reported-company.entity';

export class ReportedCompananyFactory {
  static async get(quantity = 10) {
    const results = [];

    for (let i = 0; i++; i < quantity) {
      results.push(
        new ReportedCompany({
          id: i + 1,
          name: faker.company.name(),
          description: faker.company.buzzPhrase(),
          image: faker.image.avatar(),
        }),
      );
    }

    return results;
  }
}
