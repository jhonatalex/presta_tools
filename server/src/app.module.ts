import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ToolsModule } from './modules/tools/tools.module';
import { RentalsModule } from './modules/rentals/rentals.module';
import { LegacyModule } from './modules/legacy/legacy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ToolsModule,
    RentalsModule,
    LegacyModule,
  ],
})
export class AppModule {}
