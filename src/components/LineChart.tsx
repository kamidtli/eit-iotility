/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";
import { IChartData } from "types";
import { chartColors } from "static";

interface LineChartProps {
  data: IChartData[],
  id: number
}

function LineChart(props: LineChartProps) {

  useEffect(() => {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    am4core.options.autoDispose = true;

    let chart = am4core.create(`chartdiv${props.id}`, am4charts.XYChart);

    chart.data = props.data.reverse();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    chart.yAxes.push(new am4charts.ValueAxis());

    // Create Colorset
    let colorSet = new am4core.ColorSet();
    colorSet.list = chartColors.map((c: string) => am4core.color(c))

    const color = colorSet.next();

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    series.fill = color;
    series.stroke = color;
    series.bullets.push(new am4charts.CircleBullet());

    // series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

  }, [props.data, props.id]);

  return (
    <div id={`chartdiv${props.id}`} style={{ width: "100%", height: "500px" }}></div>
  )
}

export default LineChart;