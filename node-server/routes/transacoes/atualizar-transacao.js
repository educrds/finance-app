import express from 'express';
import { executeQuery } from '../../db.config.js';
import { atualizar_transacao_por_id } from '../../queries/transacoes/UPDATE/index.js';

const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/transacao/atualizar', async (req, res) => {
  const { body } = req;

  const data_ocorrido = new Date(body.data.trs_data_ocorrido).toISOString().slice(0, 19).replace('T', ' ');

  // Montar os parâmetros
  const params = [body.data.trs_categoria, body.data.trs_valor, body.data.trs_metodo, body.data.trs_titulo, body.data.trs_descricao, data_ocorrido, body.usr_id, body.data.trs_tipo, body.data.trs_status, body.data.trs_id];

  const result = await executeQuery(atualizar_transacao_por_id, params);

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Registro atualizado com sucesso!' });

    return;
  }

  res.status(500).json({ message: 'Ocorreu um erro ao atualizar o registro, tente novamente.' });
});

export default router;
