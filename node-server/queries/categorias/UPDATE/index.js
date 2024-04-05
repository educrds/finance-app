export const atualizar_categoria = `
  UPDATE 
    tb_categorias 
  SET 
    cat_nome=?, cat_cor=?, usr_id=?, cat_tip_id=?
  WHERE cat_id = ?

`