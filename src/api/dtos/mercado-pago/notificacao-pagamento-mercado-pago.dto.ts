import { TipoNotificacaoMercadoPago } from '@/common/enums/tipo-notificacao-mercado-pago.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class NotificacaoPagamentoMercadoPagoDTO {
  @ApiProperty({
    description: 'Tipo de notificação',
    required: true,
    example: TipoNotificacaoMercadoPago.PAYMENT_CREATED,
  })
  @IsEnum(TipoNotificacaoMercadoPago)
  @IsOptional()
  action: TipoNotificacaoMercadoPago;

  @ApiProperty({
    description: 'Versão da API',
    required: true,
    example: 'v1',
  })
  @IsString()
  @IsOptional()
  api_version: string;

  @ApiProperty({
    description: 'Data do evento',
    required: true,
    example: '2024-01-22T22: 59: 46Z',
  })
  @IsString()
  @IsOptional()
  date_created: string;

  @ApiProperty({
    description: 'Id do evento',
    required: true,
    example: 123131,
  })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({
    description: 'Live mode',
    required: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  live_mode: boolean;

  @ApiProperty({
    description: 'Tipo do evento',
    required: true,
    example: 'payment',
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    description: 'ID do usuário',
    required: true,
    example: '123',
  })
  @IsString()
  @IsOptional()
  user_id: string;

  @ApiProperty({
    type: () => DadosNotificacaoPagamentoMercadoPagoDTO,
  })
  @IsOptional()
  data;
}

class DadosNotificacaoPagamentoMercadoPagoDTO {
  @ApiProperty({
    description: 'Dados do pagamento',
    required: true,
    example: '12345',
  })
  @IsString()
  id: string;
}
