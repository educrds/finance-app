// import express from 'express';
// import { executeQuery } from '../../db.config.js';
// import { delete_parcelas_by_id, delete_transacao_by_id } from '../../queries/transacoes/DELETE/index.js';

// const router = express.Router();

// // chamada POST para deletar a transacao por id;
// router.post('/transacao/deletar-parceladas', async (req, res) => {
//   const { body } = req;

//   const id = body.data;

//   const result = await executeQuery(delete_transacao_by_id, id);

//   if (result.affectedRows > 0) {
//     res.status(200).json({ message: 'Registros deletados com sucesso!' });
//     return;
//   }

//   res.status(500).json({ message: 'Ocorreu um erro ao deletar os registros, tente novamente.' });
// });

// export default router;
