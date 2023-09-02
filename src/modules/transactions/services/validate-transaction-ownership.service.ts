import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionRepository } from '@/shared/database/repositories/transactions.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionRepository.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!isOwner) throw new NotFoundException('Transaction not found.');
  }
}
