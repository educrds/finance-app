import { executeBatch } from '../config/db.config.js';
import { calcularRepeticoes } from './calcularRepeticoes.js';

export async function handleTransacaoParcelada(insertId, data_ocorrido, data_fim_repeticao) {
  const transacoes_parcelas = calcularRepeticoes(insertId, data_ocorrido, data_fim_repeticao);
  const resultBatch = await executeBatch('INSERT INTO tb_parcelas(trs_pai_id, ano, mes) VALUES(?, ?, ?)', transacoes_parcelas);

  if (resultBatch.affectedRows <= 0) {
    throw new Error('Ocorreu um erro ao adicionar os registros de parcelas.');
  }
}
