import { AvailableBalanceM } from '../model/availableBalance';

export interface AvailableBalanceRepository {
  findById(id: number): Promise<AvailableBalanceM>;
}
