import express from 'express';
import { executeQuery } from '../../db.config.js';
import { get_categorias_select } from '../../queries/categorias/GET/index.js';

const router = express.Router();

router.post('/categorias/listar-select', async (req, res) => {
  const { body } = req;

  let user_id = body.usr_id;
  const params = [body.data, user_id];

  const result = await executeQuery(get_categorias_select, params);
  res.status(200).send(result);
});

export default router;
