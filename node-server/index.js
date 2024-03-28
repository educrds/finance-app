import express from 'express';
import bodyParser from 'body-parser';

import transacoes from './routes/transacoes/transacoes.js';

const app = express();
// environment
const PORT = 5000;

app.use(bodyParser.json());

// GET TRANSAÇÕES
app.get('/transacoes/listar', transacoes);

app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`));
