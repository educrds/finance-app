export const transacoes_com_relacionamentos =
`SELECT
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
	trs.trs_parcelado,
	trs.trs_num_parcela,
	NULL as par_id,
    (
        SELECT CAST(COUNT(par.par_id) + 1 AS SIGNED)
        FROM tb_parcelas par
        WHERE par.trs_pai_id = trs.trs_id
    ) AS total_parcelas

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
	AND trs.trs_deleted = 0
UNION
SELECT
    trs.trs_data_ocorrido,
    par.ano AS trs_ano_ocorrido,
    par.mes AS trs_mes_ocorrido,
    par.trs_pai_id AS trs_id,
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
    trs.trs_parcelado,
    par.num_parcela,
    par.par_id,
    (
        SELECT CAST(COUNT(par.par_id) + 1 AS SIGNED)
        FROM tb_parcelas par
        WHERE par.trs_pai_id = trs.trs_id
    ) AS total_parcelas
FROM
    tb_parcelas par
    LEFT JOIN tb_transacoes trs ON par.trs_pai_id = trs.trs_id
    LEFT JOIN tb_categorias cat ON cat.cat_id = trs.trs_categoria
    LEFT JOIN tb_metodo met ON met.met_id = trs.trs_metodo
    LEFT JOIN tb_tipo_transacao tip_trs ON tip_trs.tip_id = trs.trs_tipo
WHERE
    trs.trs_usuario = ?
    AND (
        (trs.trs_tipo = 1 AND ? = 1)
        OR (trs.trs_tipo = 2 AND ? = 2)
        OR (? IS NULL)
    )
    AND par.ano = ?
    AND par.mes = ?
    AND par.par_deleted = 0

ORDER BY
    trs_data_ocorrido DESC;

`;

export const get_metodos = `
  SELECT met_id AS id, met_nome AS text FROM tb_metodo;
`;

export const get_transacoes_parceladas_by_pai_id = `
SELECT par_id FROM tb_parcelas WHERE par_deleted = 0 AND trs_pai_id = ?
`;

export const get_comparativo_anual = `WITH all_months AS (
    SELECT 1 AS mes UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5 UNION ALL
    SELECT 6 UNION ALL
    SELECT 7 UNION ALL
    SELECT 8 UNION ALL
    SELECT 9 UNION ALL
    SELECT 10 UNION ALL
    SELECT 11 UNION ALL
    SELECT 12
),
transacoes_parcelas AS (
    SELECT 
        trs.trs_mes_ocorrido,
        trs.trs_valor,
        trs.trs_tipo
    FROM tb_transacoes trs
    WHERE trs.trs_usuario = ?
        AND trs.trs_ano_ocorrido = ?
        AND trs.trs_deleted = 0

    UNION ALL
    
    SELECT 
        par.mes AS trs_mes_ocorrido,
        trs.trs_valor,
        trs.trs_tipo
    FROM tb_parcelas par
    LEFT JOIN tb_transacoes trs ON par.trs_pai_id = trs.trs_id
    WHERE trs.trs_usuario = ?
        AND par.ano = ?
        AND par.par_deleted = 0
)
SELECT 
    am.mes AS trs_mes_ocorrido,
    ROUND(COALESCE(SUM(CASE WHEN tp.trs_tipo = 1 THEN tp.trs_valor ELSE 0 END), 0), 2) AS entradas,
    ROUND(COALESCE(SUM(CASE WHEN tp.trs_tipo = 2 THEN tp.trs_valor ELSE 0 END), 0),2) AS saidas
FROM 
    all_months am
LEFT JOIN 
    transacoes_parcelas tp ON am.mes = tp.trs_mes_ocorrido
GROUP BY 
    am.mes
ORDER BY 
    am.mes;
`