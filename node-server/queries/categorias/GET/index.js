export const get_categorias = `
SELECT 
  cat.cat_id, cat.cat_nome, cat.cat_cor, cat.usr_id, tip.tip_nome AS cat_tip_nome
FROM 
  tb_categorias cat
LEFT JOIN 
  tb_tipo_transacao tip ON tip.tip_id = cat.cat_tip_id
WHERE cat_ativo = '0'
ORDER BY usr_id ASC;
`

export const get_categorias_select = `
SELECT 
  cat_id as id, cat_nome as text
FROM 
  tb_categorias
WHERE cat_ativo = '0' AND cat_tip_id = ?;
`