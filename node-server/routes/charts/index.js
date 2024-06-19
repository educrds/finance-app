import express from 'express';
import { getChartAnual } from "../../controllers/charts-controller.js";

const router = express.Router();

// Chamada POST para obter as transações por usuário.
router.post('/chart-anual', getChartAnual);

export default router;
