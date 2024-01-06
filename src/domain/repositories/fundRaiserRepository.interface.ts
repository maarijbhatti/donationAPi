import { FundraiserM } from '../model/fundraiser';

export interface paymentMethodRepository {
  insert(todo: FundraiserM): Promise<FundraiserM>;
  findAll(): Promise<FundraiserM[]>;
  findById(id: number): Promise<FundraiserM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
