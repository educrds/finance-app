export const atualizar_transacao_por_id = `
UPDATE
	tb_transacoes
SET
	trs_categoria = ?,
	trs_valor = ?,
	trs_metodo = ?,
	trs_titulo = ?,
	trs_descricao = ?,
	trs_data_ocorrido = ?,
	trs_usuario = ?,
	trs_tipo = ?
WHERE
	trs_id = ?;
`;
