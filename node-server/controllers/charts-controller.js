import { executeQuery } from "../config/db.config.js";
import { getYearAndMonth } from "../helpers/gerYearAndMonth.js";
import { get_comparativo_anual } from "../queries/transacoes/GET/index.js";

export const getChartAnual = async (req, res) => {
  try {
    const { data, user } = req.body;

    const { filterDate } = data;
    const { year } = getYearAndMonth(filterDate);
    const { sub } = user;

    const params = [sub, year, sub, year];

    const result = await executeQuery(get_comparativo_anual, params);
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao buscar dados do gráfico.' });
  }
}