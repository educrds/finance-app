import express from 'express';
import { executeQuery } from '../../config/db.config.js';
import { comparePassword, hashPassword } from '../../helpers/hash-password.config.js';
import { insert_user_in_bd } from '../../queries/user/INSERT/index.js';
import { get_user_by_email, verify_exists_email } from '../../queries/user/GET/index.js';

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/user/register', async (req, res) => {
  const { data } = req.body;
  const { auth_name, auth_email, auth_password } = data;

  let result = await executeQuery(verify_exists_email, auth_email);
  if(result.length > 0) {
    res.status(401).json({ message: 'Já existe uma conta cadastrada com o email fornecido.' });
    return;
  }

  let hashPwd = await hashPassword(auth_password);

  const params = [auth_name, auth_email, hashPwd];

  result = await executeQuery(insert_user_in_bd, params);

  if (result.affectedRows > 0) {
    const payload = { sub:result.usr_id , name: result.usr_nome, email: auth_email };
    const token = jwt.sign(payload, 'seu_segredo_secreto', { expiresIn: 120000 });

    res.status(200).json({ message: 'Usuário adicionado com sucesso!', token: token });
    return;
  }

  res.status(200).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente!' });
});

router.post('/user/login', async (req, res) => {
  const { data } = req.body;
  const { auth_email, auth_password } = data;

  let result = await executeQuery(verify_exists_email, auth_email);
  if(result.length === 0) {
    res.status(401).json({ message: 'Insira um usuário válido.' });
    return;
  }

  result = await executeQuery(get_user_by_email, auth_email);
  result = result[0];

  let checkPwdHash = await comparePassword(auth_password, result.password_hashed);

  if (checkPwdHash) {
    const payload = { sub:result.usr_id , name: result.usr_nome, email: auth_email };
    const token = jwt.sign(payload, 'seu_segredo_secreto', { expiresIn: '1d' });

    res.status(200).json({ message: 'Usuário autenticado com sucesso!', token: token });
    return;
  }

  res.status(401).json({ message: 'Credenciais não válidas.' });
  return;
});

export default router;