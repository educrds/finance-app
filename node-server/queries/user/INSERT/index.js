export const insert_user_in_bd = `
  INSERT INTO tb_usuarios(usr_nome, usr_email, usr_senha) VALUES (?, ?, ?);
`;