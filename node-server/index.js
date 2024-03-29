import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import transacoes from './routes/transacoes/transacoes.js';
import receitas from './routes/transacoes/receitas.js';
import despesas from './routes/transacoes/despesas.js';

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

// GET DESPESAS
app.post('/transacoes/listar/despesas', despesas);

app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`));
