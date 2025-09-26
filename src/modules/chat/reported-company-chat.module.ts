import { Module } from '@nestjs/common';
import { ReportedCompanyChatController } from './reported-company-chat.controller';
import { ReportedCompanyChatCreateRepository } from './repositories/reported-company-chat-create.repository';
import { ReportedCompanyChatCreateService } from './services/reported-company-chat-create.service';
import { ReportedCompanyChatFindAllRepository } from './repositories/reported-company-chat-find-all.repository';
import { ReportedCompanyChatFindAllService } from './services/reported-company-find-all.service';
import { UserModule } from '@modules/users/user.module';

@Module({
  controllers: [ReportedCompanyChatController],
  imports: [UserModule],
  providers: [
    ReportedCompanyChatCreateRepository,
    ReportedCompanyChatCreateService,
    ReportedCompanyChatFindAllRepository,
    ReportedCompanyChatFindAllService,
  ],
})
export class ReportedCompanyChatModule {}
