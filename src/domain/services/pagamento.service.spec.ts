import { PagamentoService } from './pagamento.service';
import { CriarPagamentoDTO, NotificacaoPagamentoMercadoPagoDTO } from '@/api/dtos';
import { PagamentoEntity } from '@/domain/entities';

class MockPagamentoService implements PagamentoService {
  async criar(criarPagamento: CriarPagamentoDTO): Promise<PagamentoEntity> {
    return {
      id: 'pagamento123',
      idPedido: criarPagamento.idPedido,
      status: 'PENDENTE',
      valor: criarPagamento.valor
    };
  }

  receberNotificacao(
    notificacaoPagamentoMercadoPagoDTO: NotificacaoPagamentoMercadoPagoDTO,
  ): void {
    // Implementação simulada para o método receberNotificacao
  }

  async pegarPorPedido(idPedido: string): Promise<PagamentoEntity> {
    return {
      id: 'pagamento123',
      idPedido: idPedido,
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    };
  }

  async pegarPorId(id: string): Promise<PagamentoEntity> {
    return {
      id: id,
      idPedido: 'pedido123',
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    };
  }
}

describe('PagamentoService', () => {
  let service: PagamentoService;

  beforeEach(() => {
    service = new MockPagamentoService();
  });

  it('deve criar um pagamento com sucesso', async () => {
    const criarPagamentoDTO: CriarPagamentoDTO = {
      idPedido: 'pedido123',
      valor: 100,
      // outros campos necessários...
    };

    const resultado = await service.criar(criarPagamentoDTO);

    expect(resultado).toEqual({
      id: 'pagamento123',
      idPedido: 'pedido123',
      status: 'PENDENTE',
      valor: 100,
      // outros campos necessários...
    });
  });

  it('deve pegar um pagamento por pedido com sucesso', async () => {
    const idPedido = 'pedido123';
    const resultado = await service.pegarPorPedido(idPedido);

    expect(resultado).toEqual({
      id: 'pagamento123',
      idPedido: idPedido,
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    });
  });

  it('deve pegar um pagamento por ID com sucesso', async () => {
    const id = 'pagamento123';
    const resultado = await service.pegarPorId(id);

    expect(resultado).toEqual({
      id: id,
      idPedido: 'pedido123',
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    });
  });

  it('deve receber uma notificação de pagamento sem erros', () => {
    const notificacao: NotificacaoPagamentoMercadoPagoDTO = {
      id: 'notificacao123',
      status: 'APROVADO',
      // outros campos necessários...
    };

    expect(() => service.receberNotificacao(notificacao)).not.toThrow();
  });
});
