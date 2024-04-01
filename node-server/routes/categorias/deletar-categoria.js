import express from 'express';
import executeQuery from '../../db.config.js';
import { deletar_categoria } from '../../queries/categorias/DELETE/index.js';

const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/categoria/deletar', async (req, res) => {
  const { body } = req;

  const result = await executeQuery(deletar_categoria, body.data.cat_id);

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Registro deletado com sucesso!' });

    return;
  }

  res.status(500).json({ message: 'Ocorreu um erro ao deletar o registro, tente novamente.' });
});

export default router;
