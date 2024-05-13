import { CreatePagamentoMercadoPagoDTO } from '@/api/dtos';
import { CreatePagamentoMercadoPagoResponseDTO } from '@/api/dtos/mercado-pago/create-pagamento-mercado-pago-response.dto';
import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CriarPagamentoUseCase {

  private mercadoPagoUserId: string;
  private mercadoBaseURL: string;
  private mercadoPagoPOS: string;
  private mercadoPagoAccessToken: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoUserId = this.configService.get('MERCADO_PAGO_USER_ID');
    this.mercadoBaseURL = this.configService.get('MERCADO_PAGO_BASE_URL');
    this.mercadoPagoPOS = this.configService.get('MERCADO_PAGO_POS');
    this.mercadoPagoAccessToken = this.configService.get('MERCADO_PAGO_ACCESS_TOKEN');
  }

  async execute(pagamento: PagamentoRepository.Criar.Entrada): Promise<PagamentoEntity> {
    try {

      const createPagamentoMercadoPagoDTO = new CreatePagamentoMercadoPagoDTO(params.pedido);
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${this.mercadoPagoAccessToken}`
        },
      };
      const body = JSON.parse(JSON.stringify(createPagamentoMercadoPagoDTO));

      const url = `${this.mercadoBaseURL}/instore/orders/qr/seller/collectors/${this.mercadoPagoUserId}/pos/${this.mercadoPagoPOS}/qrs`;
      const request = this.httpService.post<CreatePagamentoMercadoPagoResponseDTO>(
        url,
        body,
        requestConfig
      );
      const response = await firstValueFrom(request);

      if (response) {
        const pagamento = new PagamentoEntity({
          qrData: response.data.qr_data
        });

        pedido.pagamento = pagamento;
        return (await this.pedidoRepository.create({ pedido })).pagamento;
      } else {
        throw new ErroIntegracaoMercadoPagoException('Erro ao gerar QR Code de pagamento!');
      }
    } catch (erro) {
      throw new ErroIntegracaoMercadoPagoException('Erro ao gerar QR Code de pagamento!');
    }
  }
  
  validaGeracaoQrCode(){

  }

}
