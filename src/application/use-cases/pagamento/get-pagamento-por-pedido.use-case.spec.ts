import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoNaoEncontradoException } from '@/common/exceptions/pagamento/pagamento-nao-encontrado.exception';
import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { GetPagamentoPorPedidoUseCase } from './get-pagamento-por-pedido.use-case';

describe('GetPagamentoPorPedidoUseCase', () => {
  let useCase: GetPagamentoPorPedidoUseCase;
  let pagamentoRepository: PagamentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPagamentoPorPedidoUseCase,
        {
          provide: PagamentoRepository,
          useValue: {
            pegarPorPedido: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetPagamentoPorPedidoUseCase>(GetPagamentoPorPedidoUseCase);
    pagamentoRepository = module.get<PagamentoRepository>(PagamentoRepository);
  });

  it('deve retornar um pagamento com sucesso ao buscar por pedido', async () => {
    const idPedido = 'pedido123';
    const pagamento: PagamentoEntity = {
      id: 'pagamento123',
      idPedido: 'pedido123',
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    };

    jest.spyOn(pagamentoRepository, 'pegarPorPedido').mockResolvedValue(pagamento);

    const resultado = await useCase.executar(idPedido);

    expect(pagamentoRepository.pegarPorPedido).toHaveBeenCalledWith(idPedido);
    expect(resultado).toEqual(pagamento);
  });

  it('deve lançar PagamentoNaoEncontradoException quando o pagamento não for encontrado', async () => {
    const idPedido = 'pedido123';

    jest.spyOn(pagamentoRepository, 'pegarPorPedido').mockResolvedValue(null);

    await expect(useCase.executar(idPedido)).rejects.toThrow(PagamentoNaoEncontradoException);
    expect(pagamentoRepository.pegarPorPedido).toHaveBeenCalledWith(idPedido);
  });
});
