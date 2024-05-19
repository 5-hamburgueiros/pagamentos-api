import { IsArray,  IsNumber,  IsString } from "class-validator";

export class CriarPagamentoDTO {
  @IsString()
  idPedido: string;
  @IsNumber()
  valorPedido: number;
}