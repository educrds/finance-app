// adicionar numero da transacao ao BD, para que na query possa retornar qual numero a parcela está
export function calcularRepeticoes(idTransacaoPai, dataOcorrido, dataFimRepeticao, user_id) {
  // Extrair o ano e o mês da data de ocorrência
  const anoOcorrido = dataOcorrido.getFullYear();
  const mesOcorrido = dataOcorrido.getMonth() + 2; // Meses em JavaScript são baseados em zero, então adicionamos 1, por padrão, e mais 1 para começar sempre um mês a frente da data ocorrida.

  // Extrair o ano e o mês da data de término de repetição
  const anoFimRepeticao = dataFimRepeticao.getFullYear();
  const mesFimRepeticao = dataFimRepeticao.getMonth() + 1;

  // Calcular o número de repetições
  const numRepeticoes = (anoFimRepeticao - anoOcorrido) * 12 + (mesFimRepeticao - mesOcorrido) + 1;

  // Array para armazenar as repetições
  const repeticoes = [];

  // Iterar para cada repetição e adicionar ao array
  let anoAtual = anoOcorrido;
  let mesAtual = mesOcorrido;
  
  
  for (let i = 0; i < numRepeticoes; i++) {
    let num_parcela = i + 1;

    // Adicionar o ano e o mês atual ao array de repetições
    repeticoes.push([idTransacaoPai, anoAtual, mesAtual, user_id, num_parcela + 1]);

    // Incrementar o mês e ajustar o ano, se necessário
    mesAtual++;
    if (mesAtual > 12) {
      mesAtual = 1; // Reiniciar para janeiro
      anoAtual++; // Avançar para o próximo ano
    }
  }

  return repeticoes;
}
