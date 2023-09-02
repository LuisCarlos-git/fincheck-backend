import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.TransactionCreateArgs) {
    return await this.prismaService.transaction.create(createDto);
  }

  async update(updateDto: Prisma.TransactionUpdateArgs) {
    return await this.prismaService.transaction.update(updateDto);
  }

  async delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return await this.prismaService.transaction.delete(deleteDto);
  }

  async findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return await this.prismaService.transaction.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return await this.prismaService.transaction.findFirst(findFirstDto);
  }
}
