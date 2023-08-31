import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(createDto);
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        categories: true,
        transactions: true,
        bankAccounts: true,
      },
    });
  }
}
