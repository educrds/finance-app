export const update_preferencia = `
UPDATE 
  tb_preferences 
SET 
  comparativo_mensal=?, saidas_por_categoria=?, saidas_por_metodo=?, entradas_por_categoria=?
WHERE usr_id=? AND prf_id=?
`