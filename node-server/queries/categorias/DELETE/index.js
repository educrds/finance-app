export const deletar_categoria = `
  UPDATE 
    tb_categorias 
  SET 
    cat_ativo='1'
  WHERE cat_id = ?
`;