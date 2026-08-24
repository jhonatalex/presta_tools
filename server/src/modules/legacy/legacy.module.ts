import { Module } from '@nestjs/common';
import { LegacyController } from './legacy.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ToolsModule } from '../tools/tools.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [AuthModule, UsersModule, ToolsModule, CategoriesModule],
  controllers: [LegacyController],
})
export class LegacyModule {}
