import express from 'express';
import { executeQuery } from '../../config/db.config.js';
import { transacoes_com_relacionamentos, get_metodos } from '../../queries/transacoes/GET/index.js';
import { delete_transacao_by_id } from '../../queries/transacoes/DELETE/index.js';
import { atualizar_transacao_por_id } from '../../queries/transacoes/UPDATE/index.js';

import { getYearAndMonth } from '../../helpers/gerYearAndMonth.js';

const router = express.Router();

// Chamada POST para obter as transações por usuário.
router.post('/transacoes/listar', async (req, res) => {
  try {
    const { body } = req;

    const { year, month } = getYearAndMonth(body.data.filterDate);
    const tipo_transacao = body.data.idTipoTransacao;
    const user_id = body.user.sub;

    // Montar os parâmetros
    const params = [user_id, tipo_transacao, tipo_transacao, tipo_transacao, year, month, user_id, tipo_transacao, tipo_transacao, tipo_transacao, year, month];

    const result = await executeQuery(transacoes_com_relacionamentos, params);
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao buscar transações.' });
  }
});

// Chamada POST para obter os metódos de pagamento.
router.post('/transacoes/listar/metodos', async (req, res) => {
  try {
    const result = await executeQuery(get_metodos);

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: 'Nenhum metódo encontrado.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao buscar metódos.' });
  }
});

// Chamada POST para deletar a transacao por id.
router.post('/transacao/deletar', async (req, res) => {
  try {
    const { body } = req;
    const id_transacao = body.data;

    const result = await executeQuery(delete_transacao_by_id, id_transacao);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao deletar o registro, tente novamente.' });
  }
});

// Chamada POST para obter as transações por usuário.
router.post('/transacao/atualizar', async (req, res) => {
  try {
    const { body } = req;

    const data_ocorrido = new Date(body.data.trs_data_ocorrido).toISOString().slice(0, 19).replace('T', ' ');

    // Montar os parâmetros
    const params = [body.data.trs_categoria, body.data.trs_valor, body.data.trs_metodo, body.data.trs_titulo, body.data.trs_descricao, data_ocorrido, body.user.sub, body.data.trs_tipo, body.data.trs_status, body.data.trs_id];

    const result = await executeQuery(atualizar_transacao_por_id, params);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro atualizado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o registro, tente novamente.' });
  }
});

export default router;
