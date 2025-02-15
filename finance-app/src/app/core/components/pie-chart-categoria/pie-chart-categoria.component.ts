import { ChangeDetectionStrategy, Component, input, OnChanges, SimpleChanges } from "@angular/core";
import { CategoriaChartItem, CategoriesGroupedByType, ChartOptions } from "../../models/Chart";
import SharedUtil from "../../../shared/utils";
import { ChartComponent } from "ng-apexcharts";

@Component({
    selector: "coinz-pie-chart-categoria",
    templateUrl: "./pie-chart-categoria.component.html",
    styleUrls: ["./pie-chart-categoria.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ChartComponent]
})
export class PieChartCategoriaComponent implements OnChanges {
  public chartData = input<CategoriesGroupedByType | CategoriaChartItem>({});
  protected chartOptions!: Partial<ChartOptions> | any;

  ngOnChanges(changes: SimpleChanges): void {
    if ("chartData" in changes) {
      this.configPieCharts();
    }
  }

  // Configurando gráfico de pizza com dados já modelados
  private configPieCharts(): void {
    const categoryItems: CategoriaChartItem[] = Object.values(this.chartData());

    const colors = categoryItems.map((item: CategoriaChartItem) => item.cor);
    const series = categoryItems.map((item: CategoriaChartItem) => item.value);

    this.chartOptions = {
      series: series,
      chart: {
        type: "pie",
        height: 255,
      },
      options: {
        stroke: {
          show: false,
        },
        legend: {
          fontSize: "14px",
          horizontalAlign: "right",
          position: "right",
          labels: {
            colors: "#dedede",
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          y: {
            formatter: (val: number) => SharedUtil.numToCurrency(val),
          },
        },
      },
      labels: categoryItems.map((item: CategoriaChartItem) => item.name),
      colors: colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }
}
