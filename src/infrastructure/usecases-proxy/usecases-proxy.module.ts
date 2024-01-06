import { DynamicModule, Module } from '@nestjs/common';
import { addPaymentMethodUseCases } from '../../usecases/paymentMethod/addPaymentMethod.usecases';
import { deletePaymentMethodUseCases } from '../../usecases/paymentMethod/deletePaymentMethod.usecases';
import { GetPaymentMethodUseCases } from '../../usecases/paymentMethod/getPaymentMethod.usecases';
import { getPaymentMethodsUseCases } from '../../usecases/paymentMethod/getPaymentMethods.usecases';
import { updatePaymentMethodUseCases } from '../../usecases/paymentMethod/updatePaymentMethod.usecases';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabasePaymentMethodRepository } from '../repositories/paymentMethod.repository';
import { DatabaseAvailableBalanceRepository } from '../repositories/availableBalance.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static GET_TODO_USECASES_PROXY = 'getPaymentMethodUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getPaymentMethodsUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postPaymentMethodUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deletePaymentMethodUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putPaymentMethodUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseAvailableBalanceRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            availableBalanceRepo: DatabaseAvailableBalanceRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, availableBalanceRepo, bcryptService)),
        },
        {
          inject: [DatabaseAvailableBalanceRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (availableBalanceRepo: DatabaseAvailableBalanceRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(availableBalanceRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabasePaymentMethodRepository],
          provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (paymentMethodRepository: DatabasePaymentMethodRepository) => new UseCaseProxy(new GetPaymentMethodUseCases(paymentMethodRepository)),
        },
        {
          inject: [DatabasePaymentMethodRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (paymentMethodRepository: DatabasePaymentMethodRepository) => new UseCaseProxy(new getPaymentMethodsUseCases(paymentMethodRepository)),
        },
        {
          inject: [LoggerService, DatabasePaymentMethodRepository],
          provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, paymentMethodRepository: DatabasePaymentMethodRepository) =>
            new UseCaseProxy(new addPaymentMethodUseCases(logger, paymentMethodRepository)),
        },
        {
          inject: [LoggerService, DatabasePaymentMethodRepository],
          provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, paymentMethodRepository: DatabasePaymentMethodRepository) =>
            new UseCaseProxy(new updatePaymentMethodUseCases(logger, paymentMethodRepository)),
        },
        {
          inject: [LoggerService, DatabasePaymentMethodRepository],
          provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, paymentMethodRepository: DatabasePaymentMethodRepository) =>
            new UseCaseProxy(new deletePaymentMethodUseCases(logger, paymentMethodRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
      ],
    };
  }
}
