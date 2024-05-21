import { PagamentoEntity } from '@/domain/entities';
import { PagamentoModelTypeOrm } from '../typeorm/model';

export class PagamentoTypeOrmMapper {
  static paraEntidade(model: PagamentoModelTypeOrm): PagamentoEntity {
    return new PagamentoEntity({
      id: model.id,
      idPedido: model.idPedido,
      valorPedido: model.valorPedido,
      qrCode: model.qrCode,
      idExterno: model.idExterno,
      status: model.status,
    });
  }

  static deEntidade(pagamento: PagamentoEntity): PagamentoModelTypeOrm {
    const pagamentoModelTypeOrm = new PagamentoModelTypeOrm();
    pagamentoModelTypeOrm.id = pagamento.id;
    pagamentoModelTypeOrm.idPedido = pagamento.idPedido;
    pagamentoModelTypeOrm.valorPedido = pagamento.valorPedido;
    pagamentoModelTypeOrm.qrCode = pagamento.qrCode;
    pagamentoModelTypeOrm.idExterno = pagamento.idExterno;
    pagamentoModelTypeOrm.status = pagamento.status;
    pagamentoModelTypeOrm.atualizadoEm = pagamento.atualizadoEm;
    pagamentoModelTypeOrm.criadoEm = pagamento.criadoEm;
    return pagamentoModelTypeOrm;
  }
}
