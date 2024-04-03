export const transacoes_com_relacionamentos = `
  SELECT
    trs.trs_data_ocorrido,
    trs.trs_id,
    trs.trs_ano_ocorrido,
    trs.trs_mes_ocorrido,
    trs.trs_valor,
    trs.trs_titulo,
    trs.trs_status,
    cat.cat_nome AS categoria_nome,
    cat.cat_cor AS categoria_cor,
    cat.cat_id AS id_categoria,
    met.met_nome AS metodo,
    usr.usr_nome AS nome_usuario,
    tip_trs.tip_nome AS tipo_transacao,
    tip_trs.tip_id AS id_tipo_transacao,
    trs.trs_parcelado
  FROM
    tb_transacoes trs
    LEFT JOIN tb_categorias cat ON cat.cat_id = trs.trs_categoria
    LEFT JOIN tb_metodo met ON met.met_id = trs.trs_metodo
    LEFT JOIN tb_usuarios usr ON usr.usr_id = trs.trs_usuario
    LEFT JOIN tb_tipo_transacao tip_trs ON tip_trs.tip_id = trs.trs_tipo`;

export const receitas_com_relacionamentos = `
  SELECT
      trs.trs_data_ocorrido,
      trs.trs_ano_ocorrido,
      trs.trs_id,
      trs.trs_mes_ocorrido,
      trs.trs_valor,
      trs.trs_titulo,
      trs.trs_status,
      cat.cat_nome AS categoria_nome,
      cat.cat_cor AS categoria_cor,
      met.met_nome AS metodo,
      usr.usr_nome AS nome_usuario,
      tip_trs.tip_nome AS tipo_transacao,
      tip_trs.tip_id AS id_tipo_transacao,
      trs.trs_parcelado
    FROM
      tb_transacoes trs
      LEFT JOIN tb_categorias cat ON cat.cat_id = trs.trs_categoria
      LEFT JOIN tb_metodo met ON met.met_id = trs.trs_metodo
      LEFT JOIN tb_usuarios usr ON usr.usr_id = trs.trs_usuario
      LEFT JOIN tb_tipo_transacao tip_trs ON tip_trs.tip_id = trs.trs_tipo
    WHERE tip_trs.tip_id = 1`;

export const despesas_com_relacionamentos = `
  SELECT
      trs.trs_data_ocorrido,
      trs.trs_ano_ocorrido,
      trs.trs_id,
      trs.trs_mes_ocorrido,
      trs.trs_valor,
      trs.trs_titulo,
      trs.trs_status,
      cat.cat_nome AS categoria_nome,
      cat.cat_cor AS categoria_cor,
      met.met_nome AS metodo,
      usr.usr_nome AS nome_usuario,
      tip_trs.tip_nome AS tipo_transacao,
      tip_trs.tip_id AS id_tipo_transacao,
      trs.trs_parcelado
    FROM
      tb_transacoes trs
      LEFT JOIN tb_categorias cat ON cat.cat_id = trs.trs_categoria
      LEFT JOIN tb_metodo met ON met.met_id = trs.trs_metodo
      LEFT JOIN tb_usuarios usr ON usr.usr_id = trs.trs_usuario
      LEFT JOIN tb_tipo_transacao tip_trs ON tip_trs.tip_id = trs.trs_tipo
    WHERE tip_trs.tip_id = 2`;
