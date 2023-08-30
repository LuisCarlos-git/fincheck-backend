import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/database/prisma.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
