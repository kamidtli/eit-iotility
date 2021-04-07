import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";
import { IMultipleChartData } from "types";
import { chartColors } from "static";

interface LineChartProps {
  data: IMultipleChartData[],
  numOfValues: number,
  id: number
}

function MultipleLineChart(props: LineChartProps) {

  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    am4core.options.autoDispose = true;

    let chart = am4core.create(`chartdiv${props.id}`, am4charts.XYChart);

    chart.data = props.data;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    chart.yAxes.push(new am4charts.ValueAxis());

    // Create Colorset
    let colorSet = new am4core.ColorSet();
    colorSet.list = chartColors.map((c: string) => am4core.color(c))

    // Create series
    for (let i = 0; i < props.numOfValues; i++) {
      let series = chart.series.push(new am4charts.LineSeries());
      let color = colorSet.next();
      series.dataFields.valueY = "value" + (i+1);
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}";
      series.fill = color;
      series.stroke = color;
      series.bullets.push(new am4charts.CircleBullet());
    }
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    chart.scrollbarX = new am4core.Scrollbar();

  }, [props.data, props.id, props.numOfValues]);

  return (
    <div id={`chartdiv${props.id}`} style={{ width: "100%", height: "500px" }}></div>
  )
}

export default MultipleLineChart;