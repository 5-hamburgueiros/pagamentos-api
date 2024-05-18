import { PagamentoEntity } from '@/domain/entities';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { Inject, Injectable } from '@nestjs/common';
import { MercadoPagoHelper } from '../helpers/mercado-pago.helper';
import { CreatePagamentoDTO, CreatePagamentoMercadoPagoDTO, CreatePagamentoMercadoPagoResponseDTO } from '../dtos';
import { firstValueFrom } from 'rxjs';
import { ErroIntegracaoMercadoPagoException } from '@/common/exceptions/mercado-pago/erro-integracao-mercado-pago.exception';
import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { CriarPagamentoUseCase } from '@/application/use-cases/pagamento/criar-pagamento.use-case';

@Injectable()
export class PagamentoServiceImpl implements PagamentoService {
  constructor(
    @Inject(CriarPagamentoUseCase)
    private readonly crarPagamentoUseCase: CriarPagamentoUseCase,
    @Inject()
    private mercadoPagoHelper: MercadoPagoHelper,
  ) { }

  async criar(createPagamentoDTO: CreatePagamentoDTO): Promise<PagamentoEntity> {
    const createPagamentoMercadoPagoDTO = new CreatePagamentoMercadoPagoDTO(createPagamentoDTO);
    const response: CreatePagamentoMercadoPagoResponseDTO = await firstValueFrom(this.mercadoPagoHelper.getRequisicaoCriarPagamento(createPagamentoMercadoPagoDTO));

    this.validaResponseCriarPagamento(response);
    //TODO: criar pagamento
    const pagamento: PagamentoEntity = null;

    return (await this.crarPagamentoUseCase.execute(pagamento));
  }

  private validaResponseCriarPagamento(response: CreatePagamentoMercadoPagoResponseDTO): void {
    if (!response || !response || !response.qr_data) {
      throw new ErroIntegracaoMercadoPagoException(MensagensErro.ERRO_INTEGRACAO_MERCADO_PAGO);
    }
  }
}
