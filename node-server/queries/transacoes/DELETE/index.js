export const delete_transacao_by_id = `UPDATE tb_transacoes SET trs_deleted=1 WHERE trs_id=?`
export const delete_transacao_parcela_by_id = `UPDATE tb_parcelas SET par_deleted=1 WHERE par_id=?`