import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodM } from '../../../domain/model/paymentMethod';

export class PaymentMethodPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  card_number: string;
  @ApiProperty()
  name_on_card: string;

  @ApiProperty()
  cvc: number;

  @ApiProperty()
  expireDate: Date;
  @ApiProperty()
  issueDate: Date;

  constructor(paymentMethod: PaymentMethodM) {
    this.id = paymentMethod.id;
    this.card_number = paymentMethod.card_number;
    this.name_on_card = paymentMethod.name_on_card;
    this.cvc = paymentMethod.cvc;
    this.expireDate = paymentMethod.expireDate;
    this.issueDate = paymentMethod.issueDate;
  }
}
