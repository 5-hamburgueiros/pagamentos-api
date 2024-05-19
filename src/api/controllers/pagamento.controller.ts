import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { PagamentoService } from "@/domain/services/pagamento.service";
import { CriarPagamentoDTO } from "../dtos/pagamento/criar-pagamento.dto";

@Controller('pagamentos')
export class PagamentoController {

  constructor(
    @Inject(PagamentoService)
    private pagamentoService: PagamentoService
  ) { }

  @Post()
  criarPagamento(@Body() criarPagamentoDTO: CriarPagamentoDTO) {
    console.log("entrei criarPagamento")
    return this.pagamentoService.criar(criarPagamentoDTO);
  }

  @Get()
  getPagamento() { }
}