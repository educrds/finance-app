import { executeQuery } from '../config/db.config.js';
import { verifyExistsCategory } from '../helpers/verifyExistsCategory.js';
import { deletar_categoria } from '../queries/categorias/DELETE/index.js';
import { get_categorias, get_categorias_select } from '../queries/categorias/GET/index.js';
import { insert_categoria } from '../queries/categorias/INSERT/index.js';
import { atualizar_categoria } from '../queries/categorias/UPDATE/index.js';

export const listarCategorias = async (req, res) => {
  try {
    const { sub } = req.body.user;

    const result = await executeQuery(get_categorias, sub);
    if (result.length > 0) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).send({ message: 'Ocorreu um erro ao buscar categorias' });
  }
};

export const listarCategoriasSelect = async (req, res) => {
  try {
    const { sub } = req.body.user;
    const { cat_tip_id } = req.body.data;

    const params = [cat_tip_id, sub];

    const result = await executeQuery(get_categorias_select, params);
    if (result.length > 0) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ message: '  s' });
  }
};

export const adicionarCategoria = async (req, res) => {
  try {
    const { sub } = req.body.user;
    const { cat_nome, cat_cor, cat_tip_id } = req.body.data;

    const existsCategory = await verifyExistsCategory([cat_nome, sub]);
    if (existsCategory) {
      return res.status(500).json({ message: 'Já existe uma categoria com o nome fornecido.' });
    }

    // Montar os parâmetros
    const params = [cat_nome, cat_cor, sub, cat_tip_id];
    const result = await executeQuery(insert_categoria, params);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro adicionado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao adicionar o registro, tente novamente.' });
  }
};

export const atualizarCategoria = async (req, res) => {
  try {
    const { sub } = req.body.user;
    const { cat_nome, cat_cor, cat_tip_id, cat_id } = req.body.data;

    const existsCategory = await verifyExistsCategory([cat_nome, sub]);
    if (existsCategory) {
      return res.status(500).json({ message: 'Já existe uma categoria com o nome fornecido.' });
    }

    // Montar os parâmetros
    const params = [cat_nome, cat_cor, sub, cat_tip_id, cat_id];
    const result = await executeQuery(atualizar_categoria, params);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro adicionado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o registro, tente novamente.' });
  }
};

export const deletarCategoria = async (req, res) => {
  try {
    const { cat_id } = req.body.data;

    const result = await executeQuery(deletar_categoria, cat_id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Registro deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao deletar o registro, tente novamente.' });
  }
};