import { executeQuery } from "../config/db.config.js";
import { comparePassword, hashPassword } from "../helpers/hash-password.config.js";
import { privateKey } from "../middlewares/verify-token.js";
import { insert_preferencia_new_user } from "../queries/preferences/INSERT/index.js";
import { get_user_by_email, verify_exists_email } from "../queries/user/GET/index.js";
import { insert_user_in_bd } from "../queries/user/INSERT/index.js";
import jwt from 'jsonwebtoken';

const signOptions = {
  algorithm: 'RS256',
  expiresIn: '1d'
};

export const registerUser = async (req, res) => {
  const { data } = req.body;
  const { socialAuth } = req.body;
  const { auth_name, auth_email, auth_password } = data;

  let hashPwd = null;
  let result = await executeQuery(verify_exists_email, auth_email);

  if (result.length > 0) {
    return res.status(401).json({ message: 'Já existe uma conta cadastrada com o email fornecido.' });
  }

  if(!socialAuth){
    hashPwd = await hashPassword(auth_password);
  }
  
  const params = [auth_name, auth_email, hashPwd];
  result = await executeQuery(insert_user_in_bd, params);
  const insertId = String(result.insertId).replace('n');
  const preferencesNewUser = await executeQuery(insert_preferencia_new_user, insertId);

  if (result.affectedRows > 0) {
    if(!socialAuth){
      const payload = { sub: insertId, name: auth_name, email: auth_email };
      const token = jwt.sign(payload, privateKey, signOptions);
      return res.status(200).json({ message: 'Usuário adicionado com sucesso!', token: token });
    }

    return res.status(200).json({ message: 'Usuário adicionado com sucesso!' });
  }

  res.status(200).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente!' });
}

export const loginUser = async (req, res) => {
  const { data } = req.body;
  const { socialAuth } = req.body;
  const { auth_email, auth_password } = data;

  let result = await executeQuery(verify_exists_email, auth_email);
  if (result.length === 0) {
    return res.status(401).json({ message: 'Insira um usuário válido.' });
  }

  result = await executeQuery(get_user_by_email, auth_email);
  const { usr_id, usr_nome, password_hashed } = result[0];

  let checkPwdHash = null;

  if(!socialAuth){
    checkPwdHash = await comparePassword(auth_password, password_hashed);
  }

  if (checkPwdHash || socialAuth) {
    const payload = { sub: usr_id, name: usr_nome, email: auth_email };
    const token = jwt.sign(payload, privateKey, signOptions);
    return res.status(200).json({ message: 'Usuário autenticado com sucesso!', token: token });
  }

  return res.status(401).json({ message: 'Credenciais não válidas.' });
}

