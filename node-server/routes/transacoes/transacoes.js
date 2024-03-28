import express from 'express';
import executeQuery from '../../db.config.js';
const router = express.Router();

// Obter transações por usuário
async function getTransacoes() {
  return await executeQuery("SELECT * FROM tb_usuarios WHERE usr_id = ?", 1); 
  }

// chamada GET para obter as transações por usuário
router.get('/transacoes/listar', async (req, res) => {
  const result = await getTransacoes();
  res.send(result);
});

export default router;
