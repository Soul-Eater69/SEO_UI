import React from "react";
import GaugeChart from "react-gauge-chart";

function CustomGuage({ title, value, arcLengths, colors, unit, boundValues }) {
  const calculatePercentage = (value) => {
    let percentage;
    if (value <= boundValues[0]) {
      percentage = (value / boundValues[0]) * arcLengths[0];
    } else if (value > boundValues[0] && value <= boundValues[1]) {
      percentage =
        ((value - boundValues[0]) / (boundValues[1] - boundValues[0])) *
          arcLengths[1] +
        arcLengths[0];
    } else {
      percentage =
        ((value - boundValues[1]) / (boundValues[2] - boundValues[1])) *
          arcLengths[2] +
        arcLengths[0] +
        arcLengths[1];
    }

    return percentage.toFixed(2);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span>{title}</span>
      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={3}
        percent={calculatePercentage(value)}
        arcsLength={arcLengths} // updated arcsLength values
        colors={colors ? colors : ["#77e69e", "#ffd221", "#ff5353"]}
        style={{ flexBasis: "33.3%" }}
        textColor={"black"}
        hideText={true}
      />
      <span>
        {value.toFixed(1)}
        {unit ? unit : "ms"}
      </span>
    </div>
  );
}

export default CustomGuage;
