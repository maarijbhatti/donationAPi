import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethodM } from '../../domain/model/paymentMethod';
import { PaymentMethodRepository } from '../../domain/repositories/paymentMethodRepository.interface';
import { PaymentMethod } from '../entities/paymentMethod.entity';

@Injectable()
export class DatabasePaymentMethodRepository implements PaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodEntityRepository: Repository<PaymentMethod>,
  ) { }

  async updateContent(id: number, card_number: string): Promise<void> {
    await this.paymentMethodEntityRepository.update(
      {
        id: id,
      },
      { card_number: card_number },
    );
  }
  async insert(paymentMethod: PaymentMethodM): Promise<PaymentMethodM> {
    const paymentMethodEntity = this.toPaymentMethodEntity(paymentMethod);
    const result = await this.paymentMethodEntityRepository.insert(paymentMethodEntity);
    return this.toPaymentMethod(result.generatedMaps[0] as PaymentMethod);
    console.log(result.generatedMaps);
  }
  async findAll(): Promise<PaymentMethodM[]> {
    const paymentMethodsEntity = await this.paymentMethodEntityRepository.find();
    return paymentMethodsEntity.map((paymentMethodEntity) => this.toPaymentMethod(paymentMethodEntity));
  }
  async findById(id: number): Promise<PaymentMethodM> {
    const paymentMethodEntity = await this.paymentMethodEntityRepository.findOneOrFail(id);
    return this.toPaymentMethod(paymentMethodEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.paymentMethodEntityRepository.delete({ id: id });
  }

  private toPaymentMethod(paymentMethodEntity: PaymentMethod): PaymentMethodM {
    const paymentMethod: PaymentMethodM = new PaymentMethodM();

    paymentMethod.id = paymentMethodEntity.id;
    paymentMethod.card_number = paymentMethodEntity.card_number;
    paymentMethod.name_on_card = paymentMethodEntity.name_on_card;
    paymentMethod.cvc = paymentMethodEntity.cvc;
    paymentMethod.expireDate = paymentMethodEntity.expireDate;
    paymentMethod.issueDate = paymentMethodEntity.issueDate;

    return paymentMethod;
  }

  private toPaymentMethodEntity(paymentMethod: PaymentMethodM): PaymentMethod {
    const paymentMethodEntity: PaymentMethod = new PaymentMethod();

    paymentMethodEntity.id = paymentMethod.id;
    paymentMethodEntity.card_number = paymentMethod.card_number;
    paymentMethodEntity.name_on_card = paymentMethod.name_on_card;
    paymentMethodEntity.cvc = paymentMethod.cvc;
    paymentMethodEntity.expireDate = paymentMethod.expireDate;
    paymentMethodEntity.issueDate = paymentMethod.issueDate;

    return paymentMethodEntity;
  }
}
