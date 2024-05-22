import { Component, Input, ViewChild, inject } from '@angular/core';
import { Transacao } from '../../../interfaces/Transacao';
import { Table } from 'primeng/table';
import { TransacaoUtilService } from '../../services/transacao-util.service';

@Component({
  selector: 'fin-transacao-table',
  templateUrl: './transacao-table.component.html',
  styleUrl: './transacao-table.component.scss',
})
export class TransacaoTableComponent {
  @ViewChild('dt') dt: Table | undefined;
  
  @Input() transacoes: Transacao[] = [];
  @Input() rowSelected: Transacao[] = [];

  private _transacaoUtilService = inject(TransacaoUtilService);

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // configurando gráfico de pizza com dados já modelados
  protected sumSelected(transactions: any): number {
    return transactions.reduce(
      (acc: number, transacao: Transacao) => acc + transacao.trs_valor,
      0
    );
  }

  protected editarTransacao(transacao: Transacao) {
    this._transacaoUtilService.editarTransacaoUtil(transacao);
  }

  protected deletarTransacao(idTransacao: number, isParcelado: boolean) {
    this._transacaoUtilService.deletarTransacaoUtil(idTransacao, isParcelado);
  }

  protected deletarTransacoes() {
    if (this.rowSelected) {
      const transacoesIds = this.rowSelected.map((item) => item.trs_id);
      this._transacaoUtilService.deletarTransacoesUtil(transacoesIds);
    }
  }

  protected checkStatus(transacao: Transacao): string {
    return this._transacaoUtilService.checkStatusUtil(transacao);
  }
}