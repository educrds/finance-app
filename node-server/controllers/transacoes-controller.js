import { executeQuery, executeTransaction } from "../config/db.config.js";
import { getYearAndMonth } from "../helpers/gerYearAndMonth.js";
import { handleTransacaoParcelada } from "../helpers/handleTransacaoParcelada.js";
import { delete_transacao_by_id, delete_transacao_parcela_by_id } from "../queries/transacoes/DELETE/index.js";
import { get_metodos, get_transacoes_parceladas_by_pai_id, transacoes_com_relacionamentos } from "../queries/transacoes/GET/index.js";
import { insert_transacao } from "../queries/transacoes/INSERT/index.js";
import { atualizar_transacao_por_id } from "../queries/transacoes/UPDATE/index.js";

export const listarTransacoes = async (req, res) => {
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
}

export const adicionarTransacao = async (req, res) => {
  try {
    const { sub } = req.body.user;
    const { trs_valor, trs_titulo, trs_categoria, trs_data_ocorrido, data_fim_repeticao, trs_tipo, trs_metodo, trs_parcelado, trs_status } = req.body.data;

    let data_fim_rep = new Date(data_fim_repeticao);
    const data_ocorrido = new Date(trs_data_ocorrido);
    const data_ocorrido_formatted = data_ocorrido.toISOString().slice(0, 19).replace('T', ' ');

    const user_id = sub;
    const num_parcela = trs_parcelado ? 1 : null;

    // Montar os parâmetros
    const params = [trs_valor, data_ocorrido_formatted, trs_titulo, trs_categoria, user_id, trs_tipo, trs_metodo, trs_parcelado, trs_status, num_parcela];
    const result = await executeQuery(insert_transacao, params);

    const id_transacao_pai = result?.insertId;

    if (id_transacao_pai && trs_parcelado) {
      await handleTransacaoParcelada(id_transacao_pai, data_ocorrido, data_fim_rep, user_id);
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro adicionado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
  }
}

export const listarMetodos = async (req, res) => {
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
}

export const deletarTransacaoById = async (req, res) => {
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
}

export const deletarTransacaoEmMassa = async (req, res) => {
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
}

export const atualizarTransacaoById = async (req, res) => {
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
}