export type Transacao = {
  trs_data_ocorrido: string;
  trs_ano_ocorrido: number;
  trs_mes_ocorrido: number;
  trs_id: number;
  trs_valor: number;
  trs_titulo: string;
  trs_status: number;
  categoria_nome: string;
  categoria_cor: string;
  id_categoria: number;
  metodo_nome: string;
  metodo_id: number;
  tipo_transacao: string;
  id_tipo_transacao: number;
  trs_parcelado: number;
  par_id: number | null;
};
