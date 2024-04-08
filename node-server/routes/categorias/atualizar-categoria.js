import express from 'express';
import { executeQuery } from '../../db.config.js';
import { atualizar_categoria } from '../../queries/categorias/UPDATE/index.js';

const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/categoria/atualizar', async (req, res) => {
  const { body } = req;

  // Montar os parâmetros
  const params = [body.data.cat_nome, body.data.cat_cor, body.data.usr_id, body.data.cat_tip_id, body.data.cat_id];

  const result = await executeQuery(atualizar_categoria, params);

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Registro adicionado com sucesso!' });

    return;
  }

  res.status(500).json({ message: 'Ocorreu um erro ao atualizar o registro, tente novamente.' });
});

export default router;
