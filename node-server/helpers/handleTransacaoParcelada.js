import { executeBatch } from '../config/db.config.js';
import { calcularRepeticoes } from './calcularRepeticoes.js';

export async function handleTransacaoParcelada(insertId, data_ocorrido, data_fim_repeticao, user_id) {
  const transacoes_parcelas = calcularRepeticoes(insertId, data_ocorrido, data_fim_repeticao, user_id);
  const resultBatch = await executeBatch('INSERT INTO tb_parcelas(trs_pai_id, ano, mes, usr_id, num_parcela) VALUES(?, ?, ?, ?, ?)', transacoes_parcelas);

  if (resultBatch.affectedRows <= 0) {
    throw new Error('Ocorreu um erro ao adicionar os registros de parcelas.');
  }
}
