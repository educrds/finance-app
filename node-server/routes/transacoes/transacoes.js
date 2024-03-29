import express from 'express';
import executeQuery from '../../db.config.js';
import { transacoes_com_relacionamentos, receitas_com_relacionamentos } from './queries.js';
const router = express.Router();

// Obter transações por usuário
async function getTransacoes() {
  return await executeQuery(transacoes_com_relacionamentos); 
  }

// chamada GET para obter as transações por usuário
router.post('/transacoes/listar', async (req, res) => {
  const result = await getTransacoes();
  res.send(result);
});

export default router;