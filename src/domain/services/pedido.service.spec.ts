import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { PagamentoEntity } from '@/domain/entities';
import { AxiosResponse } from 'axios';
import { PedidoService } from './pedido.service'; // Ajuste o caminho de importação conforme necessário

class MockPedidoService implements PedidoService {
  notificar(pagamento: PagamentoEntity): Observable<AxiosResponse<any>> {
    const mockResponse: AxiosResponse<any> = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    return of(mockResponse);
  }
}

describe('PedidoService', () => {
  let service: PedidoService;

  beforeEach(() => {
    service = new MockPedidoService();
  });

  it('deve notificar com sucesso e retornar uma resposta Axios', (done) => {
    const pagamento: PagamentoEntity = {
      id: 'pagamento123',
      idPedido: 'pedido123',
      status: 'PAGO',
      valor: 100,
      // outros campos necessários...
    };

    service.notificar(pagamento).subscribe(response => {
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ success: true });
      done();
    });
  });
});
