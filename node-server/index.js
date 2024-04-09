import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';

import transacoes from './routes/transacoes/todas-transacoes.js';
import transacao from './routes/transacoes/adicionar-transacao.js';
import deletarTransacao from './routes/transacoes/deletar-transacao.js';
import atualizarTransacao from './routes/transacoes/atualizar-transacao.js';

import getMetodosPagamento from './routes/transacoes/metodos-transacao.js';

import categorias from './routes/categorias/todas-categorias.js';
import categoriasSelect from './routes/categorias/categorias-select.js';
import adicionarCategoria from './routes/categorias/adicionar-categoria.js';
import atualizarCategoria from './routes/categorias/atualizar-categoria.js';
import deletarCategoria from './routes/categorias/deletar-categoria.js';

import authUser from './routes/user/auth-user.js';

const app = express();
// environment
const PORT = 4201;

app.use(
  bodyParser.json(), 
  cors(),
  bodyParser.urlencoded({ extended: true })
);

// -------------------- TRANSAÇÕES

// LISTAR TRANSAÇÕES
app.post('/transacoes/listar', transacoes);

// LISTAR METÓDOS TRANSAÇÕES
app.post('/transacoes/listar/metodos', getMetodosPagamento);

// ADICIONAR TRANSAÇÕES
app.post('/transacao/adicionar', transacao);

// DELETAR TRANSAÇÕES
app.post('/transacao/deletar', deletarTransacao);

// ATUALIZAR TRANSAÇÕES
app.post('/transacao/atualizar', atualizarTransacao);

// -------------------- CATEGORIAS

// ADD TRANSAÇÕES
app.post('/categorias/listar', categorias);

// ADD TRANSAÇÕES
app.post('/categorias/listar-select', categoriasSelect);

// ADD TRANSAÇÕES
app.post('/categoria/adicionar', adicionarCategoria);

// ADD TRANSAÇÕES
app.post('/categoria/atualizar', atualizarCategoria);

// ADD TRANSAÇÕES
app.post('/categoria/deletar', deletarCategoria);

// -------------------- USUARIO

// ADD TRANSAÇÕES
app.post('/user/login', authUser);

// ADD TRANSAÇÕES
app.post('/user/register', authUser);

app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`));
