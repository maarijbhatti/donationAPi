import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { PaymentMethod } from '../entities/paymentMethod.entity';
import { AvailableBalance } from '../entities/availableBalance.entity';
import { DatabasePaymentMethodRepository } from './paymentMethod.repository';
import { DatabaseAvailableBalanceRepository } from './availableBalance.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PaymentMethod, AvailableBalance])],
  providers: [DatabasePaymentMethodRepository, DatabaseAvailableBalanceRepository],
  exports: [DatabasePaymentMethodRepository, DatabaseAvailableBalanceRepository],
})
export class RepositoriesModule { }
