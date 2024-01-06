import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { GetPaymentMethodUseCases } from '../../../usecases/paymentMethod/getPaymentMethod.usecases';
import { PaymentMethodPresenter } from './paymentMethod.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { getPaymentMethodsUseCases } from '../../../usecases/paymentMethod/getPaymentMethods.usecases';
import { updatePaymentMethodUseCases } from '../../../usecases/paymentMethod/updatePaymentMethod.usecases';
import { AddPaymentMethodDto, UpdatePaymentMethodDto } from './paymentMethod.dto';
import { deletePaymentMethodUseCases } from '../../../usecases/paymentMethod/deletePaymentMethod.usecases';
import { addPaymentMethodUseCases } from '../../../usecases/paymentMethod/addPaymentMethod.usecases';

@Controller('paymentMethod')
@ApiTags('paymentMethod')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PaymentMethodPresenter)
export class PaymentMethodController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TODO_USECASES_PROXY)
    private readonly getPaymentMethodUsecaseProxy: UseCaseProxy<GetPaymentMethodUseCases>,
    @Inject(UsecasesProxyModule.GET_TODOS_USECASES_PROXY)
    private readonly getAllPaymentMethodUsecaseProxy: UseCaseProxy<getPaymentMethodsUseCases>,
    @Inject(UsecasesProxyModule.PUT_TODO_USECASES_PROXY)
    private readonly updatePaymentMethodUsecaseProxy: UseCaseProxy<updatePaymentMethodUseCases>,
    @Inject(UsecasesProxyModule.DELETE_TODO_USECASES_PROXY)
    private readonly deletePaymentMethodUsecaseProxy: UseCaseProxy<deletePaymentMethodUseCases>,
    @Inject(UsecasesProxyModule.POST_TODO_USECASES_PROXY)
    private readonly addPaymentMethodUsecaseProxy: UseCaseProxy<addPaymentMethodUseCases>,
  ) { }

  @Get('paymentMethod')
  @ApiResponseType(PaymentMethodPresenter, false)
  async getPaymentMethod(@Query('id', ParseIntPipe) id: number) {
    const paymentMethod = await this.getPaymentMethodUsecaseProxy.getInstance().execute(id);
    return new PaymentMethodPresenter(paymentMethod);
  }

  @Get('paymentMethods')
  @ApiResponseType(PaymentMethodPresenter, true)
  async getPaymentMethods() {
    const paymentMethods = await this.getAllPaymentMethodUsecaseProxy.getInstance().execute();
    return paymentMethods.map((paymentMethod) => new PaymentMethodPresenter(paymentMethod));
  }

  @Put('paymentMethod')
  @ApiResponseType(PaymentMethodPresenter, true)
  async updatePaymentMethod(@Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const { id, card_number } = updatePaymentMethodDto;
    await this.updatePaymentMethodUsecaseProxy.getInstance().execute(id, card_number);
    return 'success';
  }

  @Delete('paymentMethod')
  @ApiResponseType(PaymentMethodPresenter, true)
  async deletePaymentMethod(@Query('id', ParseIntPipe) id: number) {
    await this.deletePaymentMethodUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('paymentMethod')
  @ApiResponseType(PaymentMethodPresenter, true)
  async addPaymentMethod(@Body() addPaymentMethodDto: AddPaymentMethodDto) {
    const { card_number } = addPaymentMethodDto;
    const paymentMethodCreated = await this.addPaymentMethodUsecaseProxy.getInstance().execute(card_number);
    return new PaymentMethodPresenter(paymentMethodCreated);
  }
}
