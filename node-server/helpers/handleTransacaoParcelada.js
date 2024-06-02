import { executeBatch, executeQuery } from '../config/db.config.js';
import { calcularRepeticoes } from './calcularRepeticoes.js';

export async function handleTransacaoParcelada(insertId, data_ocorrido, data_fim_repeticao) {
  const result_rel_parcelas = await executeQuery('INSERT INTO tb_rel_parcelas(trs_pai_id) VALUES(?)', insertId);
  const id_rel_parcelas = result_rel_parcelas?.insertId;
  const transacoes_parcelas = calcularRepeticoes(id_rel_parcelas, data_ocorrido, data_fim_repeticao);
  const resultBatch = await executeBatch('INSERT INTO tb_parcelas(trs_pai_id, ano, mes) VALUES(?, ?, ?)', transacoes_parcelas);

  if (resultBatch.affectedRows <= 0) {
    throw new Error('Ocorreu um erro ao adicionar os registros de parcelas.');
  }
}
