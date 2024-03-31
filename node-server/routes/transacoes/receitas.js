import express from 'express';
import executeQuery from '../../db.config.js';
import { receitas_com_relacionamentos } from '../../queries/transacoes/GET/index.js';
const router = express.Router();

// Obter transações por usuário
async function getReceitas() {
  return await executeQuery(receitas_com_relacionamentos); 
  }

// chamada GET para obter as transações por usuário
router.post('/transacoes/listar/receitas', async (req, res) => {
  const result = await getReceitas();
  res.send(result);
});

export default router;