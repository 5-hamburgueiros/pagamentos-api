import { PagamentoEntity } from '@/domain/entities';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { Inject, Injectable } from '@nestjs/common';
import { MercadoPagoHelper } from '../helpers/mercado-pago.helper';
import { firstValueFrom } from 'rxjs';
import { ErroIntegracaoMercadoPagoException } from '@/common/exceptions/mercado-pago/erro-integracao-mercado-pago.exception';
import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { CriarPagamentoUseCase } from '@/application/use-cases/pagamento/criar-pagamento.use-case';
import { CriarPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago-response.dto';
import { CriarPagamentoDTO } from '../dtos/pagamento/criar-pagamento.dto';
import { CriarPagamentoMercadoPagoDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago.dto';
import { MercadoPagoMapper } from '../mappers/mercado-pago.mapper';

@Injectable()
export class PagamentoServiceImpl implements PagamentoService {
  constructor(
    @Inject(CriarPagamentoUseCase)
    private readonly criarPagamentoUseCase: CriarPagamentoUseCase,
    @Inject(MercadoPagoHelper)
    private mercadoPagoHelper: MercadoPagoHelper,
    @Inject(MercadoPagoMapper)
    private mercadoPagoMapper: MercadoPagoMapper
  ) { }

  async criar(criarPagamentoDTO: CriarPagamentoDTO): Promise<PagamentoEntity> {
    const criarPagamentoMercadoPagoDTO: CriarPagamentoMercadoPagoDTO = this.mercadoPagoMapper.paraCriarPagamentoMercadoPagoDTO(criarPagamentoDTO);
    const criarPagamentoMercadoPagoResponseDTO: CriarPagamentoMercadoPagoResponseDTO = await firstValueFrom(this.mercadoPagoHelper.getRequisicaoCriarPagamento(criarPagamentoMercadoPagoDTO));
    this.validaResponseCriarPagamento(criarPagamentoMercadoPagoResponseDTO);

    const pagamento: PagamentoEntity = this.mercadoPagoMapper.criarEntidadePagamento(criarPagamentoDTO, criarPagamentoMercadoPagoResponseDTO);
    return this.criarPagamentoUseCase.executar(pagamento);
  }

  private validaResponseCriarPagamento(response: CriarPagamentoMercadoPagoResponseDTO): void {
    if (!response || !response || !response.qr_data) {
      throw new ErroIntegracaoMercadoPagoException(MensagensErro.ERRO_INTEGRACAO_MERCADO_PAGO);
    }
  }
}
