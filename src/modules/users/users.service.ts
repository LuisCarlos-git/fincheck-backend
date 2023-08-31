import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string) {
    return await this.usersRepository.findUnique({
      where: { id },
    });
  }
}
