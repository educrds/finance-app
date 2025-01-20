import { executeQuery } from '../config/db.config.js';
import { get_preferencias } from '../queries/preferences/GET/index.js';
import { insert_preferencia } from '../queries/preferences/INSERT/index.js';
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

// export const atualizarPreferencia = async (req, res) => {
//   try {
//     const { sub } = req.body.user;
//     const { cat_nome, cat_cor, cat_tip_id, cat_id } = req.body.data;

//     const existsCategory = await verifyExistsCategory([cat_nome, sub]);
//     if (existsCategory && existsCategory[0].id !== cat_id) {
//       return res.status(500).json({ message: 'Já existe uma categoria com o nome fornecido.' });
//     }

//     // Montar os parâmetros
//     const params = [cat_nome, cat_cor, sub, cat_tip_id, cat_id];
//     const result = await executeQuery(atualizar_categoria, params);
//     if (result.affectedRows > 0) {
//       res.status(200).json({ message: 'Registro adicionado com sucesso!' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Ocorreu um erro ao atualizar o registro, tente novamente.' });
//   }
// };