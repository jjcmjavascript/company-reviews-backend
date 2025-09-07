import { Module } from '@nestjs/common';
import { ReportedCompanyChatController } from './reported-company-chat.controller';
import { ReportedCompanyChatService } from './services/reported-company-chat.service';

@Module({
  controllers: [ReportedCompanyChatController],
  providers: [ReportedCompanyChatService],
})
export class ReportedCompanyChatModule {}
