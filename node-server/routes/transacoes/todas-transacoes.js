import express from 'express';
import { executeQuery, executeTransaction } from '../../config/db.config.js';
import { transacoes_com_relacionamentos, get_metodos, get_transacoes_parceladas_by_pai_id, get_comparativo_anual } from '../../queries/transacoes/GET/index.js';
import { delete_transacao_by_id, delete_transacao_parcela_by_id } from '../../queries/transacoes/DELETE/index.js';
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

router.post('/charts/comparativo-anual', async (req, res) => {
  try {
    const { data, user } = req.body;

    const { filterDate } = data;
    const { year } = getYearAndMonth(filterDate);
    const { sub } = user;

    const params = [sub, year, sub, year];

    const result = await executeQuery(get_comparativo_anual, params);
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao buscar dados do gráfico.' });
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
    const { id_transacao, trs_parcelado } = body.data;

    let result;

    if (trs_parcelado) {
      result = await executeQuery(delete_transacao_parcela_by_id, id_transacao);
    } else {
      result = await executeQuery(delete_transacao_by_id, id_transacao);
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao deletar o registro, tente novamente.' });
  }
});

// Rota POST para deletar todas as transações relacionadas a uma transação pai
router.post('/transacao/deletar-todas', async (req, res) => {
  try {
    const id_transacao = req.body.data;

    // Consulta para buscar as transações parceladas (filhas) baseadas no ID da transação pai
    let result = await executeQuery(get_transacoes_parceladas_by_pai_id, id_transacao);

    // Verifica se existem transações filhas
    if (result.length > 0) {
      const ids_parcelas = result.map(par => par.par_id);

      // Executa a transação que deleta as transações filhas e a transação pai
      await executeTransaction([
        { query: delete_transacao_parcela_by_id, params: [ids_parcelas] }, // Deleta as transações filhas
        { query: delete_transacao_by_id, params: [id_transacao] }, // Deleta a transação pai
      ]);

      res.status(200).json({ message: 'Registros deletados com sucesso!' });
    } else {
      // caso não exista mais transações filhas a serem excluídas
      result = await executeQuery(delete_transacao_by_id, id_transacao);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Registros deletados com sucesso!' });
      }
    }
  } catch (error) {
    // Responde com erro 500 se ocorrer um erro ao deletar os registros
    res.status(500).json({ message: 'Ocorreu um erro ao deletar registros, tente novamente.' });
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
