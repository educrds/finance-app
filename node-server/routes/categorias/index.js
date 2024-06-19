import express from 'express';
import { adicionarCategoria, atualizarCategoria, deletarCategoria, listarCategorias, listarCategoriasSelect } from '../../controllers/categorias-controller.js';

const router = express.Router();

// Chamada POST para listar as categorias por usuário.
router.post('/listar-categorias', listarCategorias);

// Chamada POST para listar categorias do select por usuário.
router.post('/listar-select-categorias', listarCategoriasSelect);

// Chamada POST para adicionar as categorias por usuário.
router.post('/adicionar-categoria', adicionarCategoria);

// Chamada POST para obter as atualizar a categoria por usuário
router.post('/atualizar-categoria', atualizarCategoria);

// Chamada POST para deletar categoria por id.
router.post('/deletar-categoria', deletarCategoria);

export default router;
