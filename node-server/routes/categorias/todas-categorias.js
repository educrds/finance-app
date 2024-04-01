import express from 'express';
import executeQuery from '../../db.config.js';
import { get_categorias } from '../../queries/categorias/GET/index.js'

const router = express.Router();

router.post('/categorias/listar', async (req, res) => {
  const result = await executeQuery(get_categorias);
  res.status(200).send(result);
});

export default router;