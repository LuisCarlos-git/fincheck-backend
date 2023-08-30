import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { PrismaService } from '@/shared/database/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userExists)
      throw new ConflictException({
        message: 'this email is already in use',
      });

    const hashedPassword = await hash(password, 12);

    return await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
      select: {
        name: true,
        email: true,
      },
    });
  }
}
