import { PaymentMethodM } from '../model/paymentMethod';

export interface PaymentMethodRepository {
  insert(todo: PaymentMethodM): Promise<PaymentMethodM>;
  findAll(): Promise<PaymentMethodM[]>;
  findById(id: number): Promise<PaymentMethodM>;
  updateContent(id: number, card_number: string): Promise<void>;
  deleteById(id: number): Promise<void>;
}
