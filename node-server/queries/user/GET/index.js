export const get_user_by_email = `
  SELECT usr_id, usr_senha AS password_hashed, usr_nome FROM tb_usuarios WHERE usr_email = ?;
`;

export const verify_exists_email = `SELECT * FROM tb_usuarios WHERE usr_email = ?;`;