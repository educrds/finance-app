import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import transacoes from './routes/transacoes/transacoes.js';

const app = express();
// environment
const PORT = 4201;

app.use(bodyParser.json(), cors(), bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

// GET TRANSAÇÕES
app.post('/transacoes/listar', transacoes);

app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`));
