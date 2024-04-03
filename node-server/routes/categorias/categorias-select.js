import express from 'express';
import executeQuery from '../../db.config.js';
import { get_categorias_select } from '../../queries/categorias/GET/index.js'

const router = express.Router();

router.post('/categorias/listar-select', async (req, res) => {
  const result = await executeQuery(get_categorias_select);
  res.status(200).send(result);
});

export default router;
