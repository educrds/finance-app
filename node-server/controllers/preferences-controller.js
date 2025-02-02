import { executeQuery } from '../config/db.config.js';
import { get_preferencias } from '../queries/preferences/GET/index.js';
import { insert_preferencia, insert_preferencia_new_user } from '../queries/preferences/INSERT/index.js';
import { update_preferencia } from '../queries/preferences/UPDATE/index.js';

export const listarPreferencias = async (req, res) => {
  try {
    const { sub } = req.body.user;

    const result = await executeQuery(get_preferencias, sub);
    if (result.length > 0) {
      res.status(200).send(result[0]);
    }
  } catch (error) {
    res.status(404).send({ message: 'Ocorreu um erro ao buscar categorias' });
  }
};

export const atualizarPreferencia = async (req, res) => {
  try {
    const { sub } = req.body.user;
    const { comparativo_mensal, saidas_por_metodo, saidas_por_categoria, entradas_por_categoria, prf_id } = req.body.data;

    // Montar os parâmetros
    let params = [
      comparativo_mensal,
      saidas_por_categoria,
      saidas_por_metodo,
      entradas_por_categoria,
      sub
    ];
    const query = prf_id ? update_preferencia : insert_preferencia;
    const queryParams = prf_id ? [...params, prf_id] : params;

    const result = await executeQuery(query, queryParams);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro adicionado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
  }
};

export const createPreferencesNewUser = async (user) => {
  try {
    const result = await executeQuery(insert_preferencia_new_user, user);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro adicionado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
  }
}