import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  card_number: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name_on_card: string;
  @ApiProperty({ required: false })
  @IsString()
  cvc: string;

  @ApiProperty({ required: false })
  expireDate: Date;

  @ApiProperty({ required: false })
  issueDate: Date;
}

export class AddPaymentMethodDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  card_number: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name_on_card: string;
  @ApiProperty({ required: false })
  @IsString()
  cvc: string;

  @ApiProperty({ required: false })
  expireDate: Date;

  @ApiProperty({ required: false })
  issueDate: Date;
}
