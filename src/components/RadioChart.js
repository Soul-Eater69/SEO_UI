import React from "react";
import Chart from "react-apexcharts";

const RadioChart = ({
  percentage,
  height,
  width,
  size,
  label,
  color,
  title,
}) => {
  const series = [percentage];

  const options = {
    series: series,
    chart: {
      height: 200,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: `${size}%`,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "2rem",
            formatter: function (val) {
              return label;
            },
          },
          value: {
            show: false,
          },
        },
      },
      strokeWidth: 1,
    },
    colors: [color],
  };
  return title ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={height}
        width={width}
      />
      <span>{title}</span>
    </div>
  ) : (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      height={height}
      width={width}
    />
  );
};

export default RadioChart;
