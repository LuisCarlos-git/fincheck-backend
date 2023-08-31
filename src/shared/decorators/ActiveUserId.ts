import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userId = request.userId;

    if (!userId) throw new UnauthorizedException();

    return userId;
  },
);
