import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoNaoEncontradoException } from '@/common/exceptions/pagamento/pagamento-nao-encontrado.exception';
import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { GetPagamentoPorIdUseCase } from './get-pagamento-por-id.use-case';

describe('GetPagamentoPorIdUseCase', () => {
  let useCase: GetPagamentoPorIdUseCase;
  let pagamentoRepository: PagamentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPagamentoPorIdUseCase,
        {
          provide: PagamentoRepository,
          useValue: {
            pegarPorId: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetPagamentoPorIdUseCase>(GetPagamentoPorIdUseCase);
    pagamentoRepository = module.get<PagamentoRepository>(PagamentoRepository);
  });

  it('deve retornar um pagamento com sucesso ao buscar por ID', async () => {
    const idPagamento = 'pagamento123';
    const pagamento: PagamentoEntity = {
      id: 'pagamento123',
      idPedido: 'pedido123',
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    };

    jest.spyOn(pagamentoRepository, 'pegarPorId').mockResolvedValue(pagamento);

    const resultado = await useCase.executar(idPagamento);

    expect(pagamentoRepository.pegarPorId).toHaveBeenCalledWith(idPagamento);
    expect(resultado).toEqual(pagamento);
  });

  it('deve lançar PagamentoNaoEncontradoException quando o pagamento não for encontrado', async () => {
    const idPagamento = 'pagamento123';

    jest.spyOn(pagamentoRepository, 'pegarPorId').mockResolvedValue(null);

    await expect(useCase.executar(idPagamento)).rejects.toThrow(PagamentoNaoEncontradoException);
    expect(pagamentoRepository.pegarPorId).toHaveBeenCalledWith(idPagamento);
  });
});
