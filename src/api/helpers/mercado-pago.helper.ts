import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CriarPagamentoMercadoPagoDTO, CriarPagamentoMercadoPagoResponseDTO } from "../dtos";
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class MercadoPagoHelper {
  private mercadoPagoUserId: string;
  private mercadoBaseURL: string;
  private mercadoPagoPOS: string;
  private mercadoPagoAccessToken: string;
  private urlCriarPagamento: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoUserId = this.configService.get('MERCADO_PAGO_USER_ID');
    this.mercadoBaseURL = this.configService.get('MERCADO_PAGO_BASE_URL');
    this.mercadoPagoPOS = this.configService.get('MERCADO_PAGO_POS');
    this.mercadoPagoAccessToken = this.configService.get('MERCADO_PAGO_ACCESS_TOKEN');
    this.urlCriarPagamento = this.constroiUrlCriarPagamento();
  }

  getRequisicaoCriarPagamento(criarPagamentoMercadoPagoDTO: CriarPagamentoMercadoPagoDTO): Observable<CriarPagamentoMercadoPagoResponseDTO> {
    const configuracaoRequest = this.getAxiosRequestConfig();
    const body = JSON.parse(JSON.stringify(criarPagamentoMercadoPagoDTO));
    return this.httpService
      .post(this.urlCriarPagamento, body, configuracaoRequest)
      .pipe(map(response => response.data));
  }

  private constroiUrlCriarPagamento(): string {
    return `${this.mercadoBaseURL}/instore/orders/qr/seller/collectors/${this.mercadoPagoUserId}/pos/${this.mercadoPagoPOS}/qrs`;
  }

  private getAxiosRequestConfig(): AxiosRequestConfig<any> {
    return {
      headers: {
        Authorization: `Bearer ${this.mercadoPagoAccessToken}`
      },
    };
  }
}
