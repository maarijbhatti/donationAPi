import { ILogger } from '../../domain/logger/logger.interface';
import { PaymentMethodRepository } from '../../domain/repositories/paymentMethodRepository.interface';

export class deletePaymentMethodUseCases {
  constructor(private readonly logger: ILogger, private readonly paymentMethodRepository: PaymentMethodRepository) { }

  async execute(id: number): Promise<void> {
    await this.paymentMethodRepository.deleteById(id);
    this.logger.log('deletePaymentMethodUseCases execute', `PaymentMethod ${id} have been deleted`);
  }
}
