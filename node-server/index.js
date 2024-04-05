import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import transacoes from './routes/transacoes/todas-transacoes.js';
import receitas from './routes/transacoes/receitas.js';
import despesas from './routes/transacoes/despesas.js';
import transacao from './routes/transacoes/adicionar-transacao.js';
import deletarTransacao from './routes/transacoes/deletar-transacao.js';
import atualizarTransacao from './routes/transacoes/atualizar-transacao.js';

import getMetodosPagamento from './routes/transacoes/metodos-transacao.js';

import categorias from './routes/categorias/todas-categorias.js';
import categoriasSelect from './routes/categorias/categorias-select.js';
import adicionarCategoria from './routes/categorias/adicionar-categoria.js';
import atualizarCategoria from './routes/categorias/atualizar-categoria.js';
import deletarCategoria from './routes/categorias/deletar-categoria.js';

const app = express();
// environment
const PORT = 4201;

app.use(bodyParser.json(), cors(), bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

// GET TRANSAÇÕES
app.post('/transacoes/listar', transacoes);

// GET RECEITAS
app.post('/transacoes/listar/receitas', receitas);

// GET RECEITAS
app.post('/transacoes/listar/metodos', getMetodosPagamento);

// GET DESPESAS
app.post('/transacoes/listar/despesas', despesas);

// ADD TRANSAÇÕES
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


app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`));
