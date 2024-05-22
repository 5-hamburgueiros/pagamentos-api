import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoNaoEncontradoException } from '@/common/exceptions/pagamento/pagamento-nao-encontrado.exception';
import { PagamentoEntity } from '@/domain/entities';
import { StatusPagamento } from '@/domain/enum';
import { PagamentoRepository } from '@/domain/repository';
import { AtualizarStatusPagamentoUseCase } from './atualizar-status-pagamento.use-case';

describe('AtualizarStatusPagamentoUseCase', () => {
  let useCase: AtualizarStatusPagamentoUseCase;
  let pagamentoRepository: PagamentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtualizarStatusPagamentoUseCase,
        {
          provide: PagamentoRepository,
          useValue: {
            pegarPorPedido: jest.fn(),
            atualizar: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<AtualizarStatusPagamentoUseCase>(AtualizarStatusPagamentoUseCase);
    pagamentoRepository = module.get<PagamentoRepository>(PagamentoRepository);
  });

  it('deve atualizar o status do pagamento com sucesso', async () => {
    const idPedido = 'pedido123';
    const statusPagamento = StatusPagamento.PAGO;
    const pagamento: PagamentoEntity = { id: '1', idPedido, status: StatusPagamento.PENDENTE };

    jest.spyOn(pagamentoRepository, 'pegarPorPedido').mockResolvedValue(pagamento);
    jest.spyOn(pagamentoRepository, 'atualizar').mockResolvedValue({ ...pagamento, status: statusPagamento });

    const resultado = await useCase.executar(idPedido, statusPagamento);

    expect(pagamentoRepository.pegarPorPedido).toHaveBeenCalledWith(idPedido);
    expect(pagamentoRepository.atualizar).toHaveBeenCalledWith({ ...pagamento, status: statusPagamento });
    expect(resultado.status).toBe(statusPagamento);
  });

  it('deve lançar PagamentoNaoEncontradoException quando o pagamento não for encontrado', async () => {
    const idPedido = 'pedido123';
    const statusPagamento = StatusPagamento.PAGO;

    jest.spyOn(pagamentoRepository, 'pegarPorPedido').mockResolvedValue(null);

    await expect(useCase.executar(idPedido, statusPagamento)).rejects.toThrow(PagamentoNaoEncontradoException);
    expect(pagamentoRepository.pegarPorPedido).toHaveBeenCalledWith(idPedido);
    expect(pagamentoRepository.atualizar).not.toHaveBeenCalled();
  });

  it('deve atualizar o idExterno se fornecido', async () => {
    const idPedido = 'pedido123';
    const statusPagamento = StatusPagamento.PAGO;
    const idExterno = 'externo456';
    const pagamento: PagamentoEntity = { id: '1', idPedido, status: StatusPagamento.PENDENTE };

    jest.spyOn(pagamentoRepository, 'pegarPorPedido').mockResolvedValue(pagamento);
    jest.spyOn(pagamentoRepository, 'atualizar').mockResolvedValue({ ...pagamento, status: statusPagamento, idExterno });

    const resultado = await useCase.executar(idPedido, statusPagamento, idExterno);

    expect(pagamentoRepository.pegarPorPedido).toHaveBeenCalledWith(idPedido);
    expect(pagamentoRepository.atualizar).toHaveBeenCalledWith({ ...pagamento, status: statusPagamento, idExterno });
    expect(resultado.status).toBe(statusPagamento);
    expect(resultado.idExterno).toBe(idExterno);
  });
});
