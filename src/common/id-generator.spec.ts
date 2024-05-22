import * as crypto from 'crypto';
import { IdGenerator } from './id-generator';  // Ajuste o caminho de importação conforme necessário

describe('IdGenerator', () => {
  it('deve gerar um UUID válido', () => {
    const uuid = IdGenerator.Generate();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuid).toMatch(uuidRegex);
  });
});
