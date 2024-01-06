import { ILogger } from '../../domain/logger/logger.interface';
import { PaymentMethodM } from '../../domain/model/paymentMethod';
import { PaymentMethodRepository } from '../../domain/repositories/paymentMethodRepository.interface';

export class addPaymentMethodUseCases {
  constructor(private readonly logger: ILogger, private readonly paymentMethodRepository: PaymentMethodRepository) { }

  async execute(card: string): Promise<PaymentMethodM> {
    const paymentMethod = new PaymentMethodM();
    paymentMethod.card_number = card;
    const result = await this.paymentMethodRepository.insert(paymentMethod);
    this.logger.log('addPaymentMethodUseCases execute', 'New paymentMethod have been inserted');
    return result;
  }
}
