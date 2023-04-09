import React from "react";
import Chart from "react-apexcharts";

const GradeSection = ({ seoData }) => {
  const series = [seoData["percentage"]];
  const options = {
    series: series,
    chart: {
      height: 200,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: `${70}%`,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "2rem",
            formatter: function (val) {
              return seoData["grade"];
            },
          },
          value: {
            show: false,
          },
        },
      },
      strokeWidth: 1,
    },
    colors: ["#363f46"],
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={205}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "2",
          marginTop: "1.5rem",
        }}
      >
        <h3 style={{ fontWeight: "500" }}>{seoData["grade_title"]}</h3>
        <span>{seoData["grade_text"]}</span>
      </div>
    </div>
  );
};

export default GradeSection;
