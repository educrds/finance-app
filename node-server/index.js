import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// routes
import categorias from './routes/categorias/index.js';
import transacoes from './routes/transacoes/index.js';
import charts from './routes/charts/index.js';
import user from './routes/user/index.js';

import { verifyToken } from './middlewares/verify-token.js';

const app = express();
// environment
const PORT = 4201;

app.use(bodyParser.json(), cors(), bodyParser.urlencoded({ extended: true }));

app.use('/categoria', verifyToken, categorias);
app.use('/transacao', verifyToken, transacoes);
app.use('/chart', verifyToken, charts);
app.use('/user', user);

app.listen(PORT, '192.168.1.20', () => console.log(`server is running on port: http://localhost: ${PORT}`));
