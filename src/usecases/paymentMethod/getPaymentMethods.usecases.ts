import { PaymentMethodM } from '../../domain/model/paymentMethod';
import { PaymentMethodRepository } from '../../domain/repositories/paymentMethodRepository.interface';

export class getPaymentMethodsUseCases {
  constructor(private readonly paymentMethodRepository: PaymentMethodRepository) { }

  async execute(): Promise<PaymentMethodM[]> {
    return await this.paymentMethodRepository.findAll();
  }
}
