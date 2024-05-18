import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreatePagamentoDTO } from "../dtos";
import { PagamentoService } from "@/domain/services/pagamento.service";

@Controller('pagamentos')
export class PagamentoController {

  constructor(
    @Inject(PagamentoService)
    private pagamentoService: PagamentoService
  ) {}

  @Post()
  criarPagamento(@Body() createPagamentoDTO: CreatePagamentoDTO){
    return this.pagamentoService.criar(createPagamentoDTO);
  }

  @Get()
  getPagamento(){}
}