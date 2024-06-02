import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import transacoes from './routes/transacoes/todas-transacoes.js';
import adicionar_transacao from './routes/transacoes/adicionar-transacao.js';

import categorias from './routes/categorias/todas-categorias.js';

import authUser from './routes/user/auth-user.js';
import { verifyToken } from './middlewares/verify-token.js';

const app = express();
// environment
const PORT = 4201;

app.use(bodyParser.json(), cors(), bodyParser.urlencoded({ extended: true }));

// -------------------- TRANSAÇÕES

// LISTAR TRANSAÇÕES
app.post('/transacoes/listar', verifyToken, transacoes);

// DELETAR TRANSAÇÕES
app.post('/transacao/deletar', verifyToken, transacoes);

// DELETAR TRANSAÇÃO PARCELADA
app.post('/transacao/deletar-parcela', verifyToken, transacoes);

// DELETAR TODAS TRANSAÇÕES POR ID
app.post('/transacao/deletar-todas', verifyToken, transacoes);

// ATUALIZAR TRANSAÇÕES
app.post('/transacao/atualizar', verifyToken, transacoes);

// ADICIONAR TRANSAÇÕES
app.post('/transacao/adicionar', verifyToken, adicionar_transacao);

// LISTAR METÓDOS TRANSAÇÕES
app.post('/transacoes/listar/metodos', verifyToken, transacoes);

// -------------------- CATEGORIAS

// ADD TRANSAÇÕES
app.post('/categorias/listar', verifyToken, categorias);

// ADD TRANSAÇÕES
app.post('/categorias/listar-select', verifyToken, categorias);

// ADD TRANSAÇÕES
app.post('/categoria/adicionar', verifyToken, categorias);

// ADD TRANSAÇÕES
app.post('/categoria/atualizar', verifyToken, categorias);

// ADD TRANSAÇÕES
app.post('/categoria/deletar', verifyToken, categorias);

// -------------------- USUARIO

// LOGIN USUÁRIO
app.post('/user/login', authUser);

// REGISTRA USUÁRIO
app.post('/user/register', authUser);

app.listen(PORT, '192.168.1.20', () => console.log(`server is running on port: http://localhost:`));
