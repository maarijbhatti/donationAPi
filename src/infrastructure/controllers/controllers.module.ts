import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { PaymentMethodController } from './paymentMethod/paymentMethod.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [PaymentMethodController, AuthController],
})
export class ControllersModule { }
