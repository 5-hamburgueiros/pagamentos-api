import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { CriarPagamentoUseCase } from './criar-pagamento.use-case';

describe('CriarPagamentoUseCase', () => {
  let useCase: CriarPagamentoUseCase;
  let pagamentoRepository: PagamentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriarPagamentoUseCase,
        {
          provide: PagamentoRepository,
          useValue: {
            criar: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CriarPagamentoUseCase>(CriarPagamentoUseCase);
    pagamentoRepository = module.get<PagamentoRepository>(PagamentoRepository);
  });

  it('deve criar um pagamento com sucesso', async () => {
    const pagamento: PagamentoEntity = {
      id: '1',
      idPedido: 'pedido123',
      status: 'PENDENTE',
      valor: 100,
      // outros campos necessários...
    };

    jest.spyOn(pagamentoRepository, 'criar').mockResolvedValue(pagamento);

    const resultado = await useCase.executar(pagamento);

    expect(pagamentoRepository.criar).toHaveBeenCalledWith(pagamento);
    expect(resultado).toEqual(pagamento);
  });
});
