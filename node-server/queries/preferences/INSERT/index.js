export const insert_preferencia = `
  INSERT INTO tb_preferences 
    (
    comparativo_mensal,
    saidas_por_categoria,
    saidas_por_metodo,
    entradas_por_categoria,
    usr_id
    ) 
  VALUES 
    (?, ?, ?, ?, ?);
`