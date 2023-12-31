import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { env } from '@/shared/config/env';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecret,
      global: true,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
