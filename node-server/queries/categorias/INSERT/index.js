export const insert_categoria = `
  INSERT INTO tb_categorias 
    (cat_nome, cat_cor, usr_id, cat_tip_id) 
  VALUES 
    (?, ?, ?, ?);
`