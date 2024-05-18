import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreatePagamentoMercadoPagoDTO, CreatePagamentoMercadoPagoResponseDTO } from "../dtos";
import { PagamentoRepository } from "@/domain/repository";
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";
import { AxiosRequestConfig, AxiosResponse } from "axios";

@Injectable()
export class MercadoPagoHelper {
  private mercadoPagoUserId: string;
  private mercadoBaseURL: string;
  private mercadoPagoPOS: string;
  private mercadoPagoAccessToken: string;
  private urlCriarPagamento: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(PagamentoRepository)
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoUserId = this.configService.get('MERCADO_PAGO_USER_ID');
    this.mercadoBaseURL = this.configService.get('MERCADO_PAGO_BASE_URL');
    this.mercadoPagoPOS = this.configService.get('MERCADO_PAGO_POS');
    this.mercadoPagoAccessToken = this.configService.get('MERCADO_PAGO_ACCESS_TOKEN');
    this.urlCriarPagamento = this.constroiUrlCriarPagamento();
  }

  getRequisicaoCriarPagamento(createPagamentoMercadoPagoDTO: CreatePagamentoMercadoPagoDTO): Observable<CreatePagamentoMercadoPagoResponseDTO> {
    const configuracaoRequest = this.getAxiosRequestConfig();
    const body = JSON.parse(JSON.stringify(createPagamentoMercadoPagoDTO));
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
