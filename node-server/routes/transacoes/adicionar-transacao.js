import express from 'express';
import executeQuery from '../../db.config.js';
import { insert_transacao } from '../../queries/transacoes/INSERT/index.js';

const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/transacao/adicionar', async (req, res) => {
  const { body } = req;

  const data_ocorrido = new Date(body.data.trs_data_ocorrido).toISOString().slice(0, 19).replace('T', ' ');

  // Montar os parâmetros
  const params = [body.data.trs_valor, data_ocorrido, body.data.trs_titulo, body.data.trs_descricao, body.data.trs_categoria, body.data.trs_usuario, body.data.trs_tipo, body.data.trs_metodo];

  const result = await executeQuery(insert_transacao, params);

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Registro adicionado com sucesso!' });

    return;
  }

  res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
});

export default router;
