import { ILogger } from '../../domain/logger/logger.interface';
import { PaymentMethodRepository } from '../../domain/repositories/paymentMethodRepository.interface';

export class updatePaymentMethodUseCases {
  constructor(private readonly logger: ILogger, private readonly paymentMethodRepository: PaymentMethodRepository) { }

  async execute(id: number, card_number: string): Promise<void> {
    await this.paymentMethodRepository.updateContent(id, card_number);
    this.logger.log('updatePaymentMethodUseCases execute', `PaymentMethod ${id} have been updated`);
  }
}
