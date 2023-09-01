import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { BankAccountType } from '../entities/bankAccounts';

export class CreateBankAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  initialBalance: number;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;
}
