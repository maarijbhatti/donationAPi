import { PaymentMethodM } from '../../domain/model/paymentMethod';
import { PaymentMethodRepository } from '../../domain/repositories/paymentMethodRepository.interface';

export class GetPaymentMethodUseCases {
  constructor(private readonly paymentMethodRepository: PaymentMethodRepository) { }

  async execute(id: number): Promise<PaymentMethodM> {
    return await this.paymentMethodRepository.findById(id);
  }
}
