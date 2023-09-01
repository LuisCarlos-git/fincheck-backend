import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.BankAccountCreateArgs) {
    return await this.prismaService.bankAccount.create(createDto);
  }

  async update(updateDto: Prisma.BankAccountUpdateArgs) {
    return await this.prismaService.bankAccount.update(updateDto);
  }

  async delete(deleteDto: Prisma.BankAccountDeleteArgs) {
    return await this.prismaService.bankAccount.delete(deleteDto);
  }

  async findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
    return await this.prismaService.bankAccount.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return await this.prismaService.bankAccount.findFirst(findFirstDto);
  }
}
