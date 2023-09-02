import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return await this.prismaService.category.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return await this.prismaService.category.findFirst(findFirstDto);
  }
}
