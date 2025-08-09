import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserScheduleService {
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async execute() {
    console.log('se ejecuto esta wea');
  }
}
