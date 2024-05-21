import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { CriarPagamentoDTO } from '../dtos/pagamento/criar-pagamento.dto';
import { UUID } from 'crypto';

@Controller('pagamentos')
export class PagamentoController {
  constructor(
    @Inject(PagamentoService)
    private pagamentoService: PagamentoService,
  ) {}

  @Post()
  criarPagamento(@Body() criarPagamentoDTO: CriarPagamentoDTO) {
    return this.pagamentoService.criar(criarPagamentoDTO);
  }

  @Get('pedido/:idPedido')
  getPagamentoPorPedido(@Param('idPedido') idPedido: string) {
    return this.pagamentoService.pegarPorPedido(idPedido);
  }

  @Get(':idPagamento')
  getPagamentoPorId(
    @Param('idPagamento', new ParseUUIDPipe()) idPagamento: UUID,
  ) {
    return this.pagamentoService.pegarPorId(idPagamento);
  }
}
