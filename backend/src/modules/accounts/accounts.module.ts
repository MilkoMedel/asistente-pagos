import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  providers: [AccountsService],
  exports: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
