export const transacoes_com_relacionamentos = `
SELECT
	trs.trs_data_ocorrido,
	trs.trs_ano_ocorrido,
	trs.trs_mes_ocorrido,
	trs.trs_id,
	trs.trs_valor,
	trs.trs_titulo,
	trs.trs_status,
	cat.cat_nome AS categoria_nome,
	cat.cat_cor AS categoria_cor,
	cat.cat_id AS id_categoria,
	met.met_nome AS metodo_nome,
	met.met_id AS metodo_id,
	tip_trs.tip_nome AS tipo_transacao,
	tip_trs.tip_id AS id_tipo_transacao,
	trs.trs_parcelado
FROM
	tb_transacoes trs
	LEFT JOIN tb_categorias cat ON cat.cat_id = trs.trs_categoria
	LEFT JOIN tb_metodo met ON met.met_id = trs.trs_metodo
	LEFT JOIN tb_tipo_transacao tip_trs ON tip_trs.tip_id = trs.trs_tipo
WHERE
	trs_usuario = ?
	AND (
    (trs_tipo = 1 AND ? = 1)
    OR (trs_tipo = 2 AND ? = 2)
    OR (? IS NULL)
  )
  	AND trs.trs_ano_ocorrido = ?
	AND trs.trs_mes_ocorrido = ?
UNION
SELECT
	trs.trs_data_ocorrido,
	trs.trs_ano_ocorrido,
	trs.trs_mes_ocorrido,
	par.trs_pai_id AS trs_id,
	-- Usa o id da transação pai da tabela de parcelas como trs_id
	trs.trs_valor,
	trs.trs_titulo,
	trs.trs_status,
	cat.cat_nome AS categoria_nome,
	cat.cat_cor AS categoria_cor,
	cat.cat_id AS id_categoria,
	met.met_nome AS metodo_nome,
	met.met_id AS metodo_id,
	tip_trs.tip_nome AS tipo_transacao,
	tip_trs.tip_id AS id_tipo_transacao,
	trs.trs_parcelado
FROM
	tb_parcelas par
	LEFT JOIN tb_transacoes trs ON par.trs_pai_id = trs.trs_id
	LEFT JOIN tb_categorias cat ON cat.cat_id = trs.trs_categoria
	LEFT JOIN tb_metodo met ON met.met_id = trs.trs_metodo
	LEFT JOIN tb_tipo_transacao tip_trs ON tip_trs.tip_id = trs.trs_tipo
WHERE trs_usuario = ?
  AND (
    (trs_tipo = 1 AND ? = 1)
    OR (trs_tipo = 2 AND ? = 2)
    OR (? IS NULL)
  )
	AND par.ano = ?
	AND par.mes = ?
ORDER BY
	trs_data_ocorrido DESC;
`;

export const get_metodos = `
  SELECT met_id AS id, met_nome AS text FROM tb_metodo;
`;