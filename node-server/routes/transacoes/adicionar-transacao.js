import express from 'express';
import { executeQuery, executeBatch } from '../../db.config.js';
import { insert_transacao } from '../../queries/transacoes/INSERT/index.js';

const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/transacao/adicionar', async (req, res) => {
  const { body } = req;

  const data_ocorrido = new Date(body.data.trs_data_ocorrido);
  const data_fim_repeticao = new Date(body.data?.data_fim_repeticao);

  const data_ocorrido_formatted = data_ocorrido.toISOString().slice(0, 19).replace('T', ' ');

  // Montar os parâmetros
  const params = [body.data.trs_valor, data_ocorrido_formatted, body.data.trs_titulo, body.data.trs_descricao, body.data.trs_categoria, body.usr_id, body.data.trs_tipo, body.data.trs_metodo, body.data.trs_parcelado];

  const result = await executeQuery(insert_transacao, params);
  let id_transacao_pai;

  if (result.insertId && body.data.trs_parcelado) {
    id_transacao_pai = result.insertId;

    const transacoes_parcelas = calcularRepeticoes(id_transacao_pai, data_ocorrido, data_fim_repeticao);
    const resultBatch = await executeBatch(
        'INSERT INTO tb_parcelas(trs_pai_id, ano, mes) VALUES(?, ?, ?)', transacoes_parcelas
    );

    if (resultBatch.affectedRows > 0) {
      res.status(200).json({ message: 'Registros adicionados com sucesso!' });

      return;
    }

    return res.status(500).json({ message: 'Ocorreu um erro ao adicionar os registros, tente novamente.' });
  }

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Registro adicionado com sucesso!' });

    return;
  }

  res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
});

// adicionar numero da transacao ao BD, para que na query possa retornar qual numero a parcela está 
function calcularRepeticoes(idTransacaoPai, dataOcorrido, dataFimRepeticao) {
  // Extrair o ano e o mês da data de ocorrência
  const anoOcorrido = dataOcorrido.getFullYear();
  const mesOcorrido = dataOcorrido.getMonth() + 2; // Meses em JavaScript são baseados em zero, então adicionamos 1, por padrão, e mais 1 para começar sempre um mês a frente da data ocorrida.

  // Extrair o ano e o mês da data de término de repetição
  const anoFimRepeticao = dataFimRepeticao.getFullYear();
  const mesFimRepeticao = dataFimRepeticao.getMonth() + 1;

  // Calcular o número de repetições
  const numRepeticoes = (anoFimRepeticao - anoOcorrido) * 12 + (mesFimRepeticao - mesOcorrido) + 1;

  // Array para armazenar as repetições
  const repeticoes = [];

  // Iterar para cada repetição e adicionar ao array
  let anoAtual = anoOcorrido;
  let mesAtual = mesOcorrido;

  for (let i = 0; i < numRepeticoes; i++) {
    // Adicionar o ano e o mês atual ao array de repetições
    repeticoes.push([ idTransacaoPai, anoAtual, mesAtual ]);

    // Incrementar o mês e ajustar o ano, se necessário
    mesAtual++;
    if (mesAtual > 12) {
      mesAtual = 1; // Reiniciar para janeiro
      anoAtual++; // Avançar para o próximo ano
    }
  }

  return repeticoes;
}

export default router;
