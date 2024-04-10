export const insert_user_in_bd = `
  INSERT INTO tb_usuarios(usr_nome, usr_email, usr_senha) VALUES (?, ?, ?);
`;

export const get_user_by_email = `
  SELECT usr_id, usr_senha AS password_hashed, usr_nome FROM tb_usuarios WHERE usr_email = ?;
`;