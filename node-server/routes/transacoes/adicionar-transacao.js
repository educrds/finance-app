import express from 'express';
import { executeQuery } from '../../config/db.config.js';
import { insert_transacao } from '../../queries/transacoes/INSERT/index.js';
import { handleTransacaoParcelada } from '../../helpers/handleTransacaoParcelada.js';
const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/transacao/adicionar', async (req, res) => {
  try {
    const { sub } = req.body.user;
    const { trs_valor, trs_titulo, trs_categoria, trs_data_ocorrido, data_fim_repeticao, trs_tipo, trs_metodo, trs_parcelado } = req.body.data;

    let data_fim_rep = new Date(data_fim_repeticao);
    const data_ocorrido = new Date(trs_data_ocorrido);
    const data_ocorrido_formatted = data_ocorrido.toISOString().slice(0, 19).replace('T', ' ');

    const user_id = sub;

    // Montar os parâmetros
    const params = [trs_valor, data_ocorrido_formatted, trs_titulo, trs_categoria, user_id, trs_tipo, trs_metodo, trs_parcelado];
    const result = await executeQuery(insert_transacao, params);

    const id_transacao_pai = result?.insertId;

    if (id_transacao_pai && trs_parcelado) {
      await handleTransacaoParcelada(id_transacao_pai, data_ocorrido, data_fim_rep);
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro adicionado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
  }
});

export default router;
