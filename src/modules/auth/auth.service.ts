import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { UsersRepository } from '@/shared/database/repositories/users.repository';

import { SignupDto } from './dto/signup.dto';
import { AuthenticateDto } from './dto/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new UnauthorizedException({ message: 'Invalid credentials' });

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException({ message: 'Invalid credentials' });

    return this.generateAccessToken(user.id);
  }

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists)
      throw new ConflictException({
        message: 'this email is already in use',
      });

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
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
    });

    return this.generateAccessToken(user.id);
  }

  private async generateAccessToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({ sub: userId });

    const payload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
