import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableBalanceM } from '../../domain/model/availableBalance';
import { AvailableBalanceRepository } from '../../domain/repositories/availableBalanceRepository.interface';
import { AvailableBalance } from '../entities/availableBalance.entity';

@Injectable()
export class DatabaseAvailableBalanceRepository implements AvailableBalanceRepository {
  constructor(
    @InjectRepository(AvailableBalance)
    private readonly availableBalanceEntityRepository: Repository<AvailableBalance>,
  ) { }

  async findById(id: number): Promise<AvailableBalanceM> {
    const paymentMethodEntity = await this.availableBalanceEntityRepository.findOneOrFail(id);
    return this.toAvailableBalance(paymentMethodEntity);
  }

  private toAvailableBalance(adminAvailableBalanceEntity: AvailableBalance): AvailableBalanceM {
    const adminAvailableBalance: AvailableBalanceM = new AvailableBalanceM();

    adminAvailableBalance.id = adminAvailableBalanceEntity.id;
    adminAvailableBalance.balance = adminAvailableBalanceEntity.balance;
    adminAvailableBalance.paymentMethod = adminAvailableBalanceEntity.paymentMethod;

    return adminAvailableBalance;
  }

  private toAvailableBalanceEntity(adminAvailableBalance: AvailableBalanceM): AvailableBalance {
    const adminAvailableBalanceEntity: AvailableBalance = new AvailableBalance();

    adminAvailableBalanceEntity.id = adminAvailableBalance.id;
    adminAvailableBalanceEntity.balance = adminAvailableBalance.balance;
    adminAvailableBalanceEntity.paymentMethod = adminAvailableBalance.paymentMethod;

    return adminAvailableBalanceEntity;
  }
}
