import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertContainerComponent } from './components/alert-container/alert-container.component';
import { ColumnComponent } from './components/column/column.component';
import { LogoComponent } from './components/logo/logo.component';
import { RowComponent } from './components/row/row.component';
import { TopCardComponent } from './components/top-card/top-card.component';
import { WrapContainerComponent } from './components/wrap-container/wrap-container.component';
import { BaseTransacaoDirective } from './directives/base-transacao.directive';
import { TransacaoTableComponent } from './components/transacao-table/transacao-table.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTableComponent } from './components/categoria-table/categoria-table.component';
import { TagModule } from 'primeng/tag';
import { PieChartCategoriaComponent } from './components/charts/pie-chart-categoria/pie-chart-categoria.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectionIntevalRowsDirective } from './directives/selection-inteval-rows.directive';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartAnualComponent } from './components/charts/bar-chart-anual/bar-chart-anual.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AlertContainerComponent,
    ColumnComponent,
    LogoComponent,
    RowComponent,
    TopCardComponent,
    WrapContainerComponent,
    BaseTransacaoDirective,
    TransacaoTableComponent,
    CategoriaTableComponent,
    PieChartCategoriaComponent,
    ConfirmDialogComponent,
    SelectionIntevalRowsDirective,
    BarChartAnualComponent
  ],
  exports: [
    AlertContainerComponent,
    ColumnComponent,
    LogoComponent,
    RowComponent,
    TopCardComponent,
    WrapContainerComponent,
    TransacaoTableComponent,
    CategoriaTableComponent,
    PieChartCategoriaComponent,
    ConfirmDialogComponent,
    SelectionIntevalRowsDirective,
    BarChartAnualComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    ConfirmDialogModule,
    NgApexchartsModule,
  ],
})
export class SharedModule {}
