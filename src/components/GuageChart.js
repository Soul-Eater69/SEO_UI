import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';

const GaugeChart = ({ value, minValue, maxValue, partitionCount, partitionColors, partitionLabels }) => {
  const [size, setSize] = useState(200);
  const [radius, setRadius] = useState(80);
  const [startAngle, setStartAngle] = useState(-Math.PI / 2);
  const [endAngle, setEndAngle] = useState(Math.PI / 2);
  const [partitions, setPartitions] = useState([]);

  useEffect(() => {
    const newPartitions = [];
    const partitionAngle = (endAngle - startAngle) / partitionCount;
    for (let i = 0; i < partitionCount; i++) {
      const partitionStartAngle = startAngle + i * partitionAngle;
      const partitionEndAngle = partitionStartAngle + partitionAngle;
      const partition = {
        startAngle: partitionStartAngle,
        endAngle: partitionEndAngle,
        color: partitionColors[i % partitionColors.length],
        label: partitionLabels[i % partitionLabels.length]
      };
      newPartitions.push(partition);
    }
    setPartitions(newPartitions);
  }, [startAngle, endAngle, partitionCount, partitionColors, partitionLabels]);

  const partitionValue = (value - minValue) / (maxValue - minValue);
  const pointerAngle = startAngle + partitionValue * (endAngle - startAngle);

  const pointerX = radius * Math.cos(pointerAngle);
  const pointerY = radius * Math.sin(pointerAngle);

  const arcGenerator = arc()
    .innerRadius(0)
    .outerRadius(radius);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {partitions.map((partition, index) => (
          <g key={index}>
            <path d={arcGenerator(partition)} fill={partition.color} />
            <text
              x={arcGenerator.centroid(partition)[0]}
              y={arcGenerator.centroid(partition)[1]}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {partition.label}
            </text>
          </g>
        ))}
        <line x1={0} y1={0} x2={pointerX} y2={pointerY} stroke="black" strokeWidth={2} />
        <circle cx={0} cy={0} r={5} fill="black" />
      </g>
    </svg>
  );
};

GaugeChart.propTypes = {
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  partitionCount: PropTypes.number.isRequired,
  partitionColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  partitionLabels: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GaugeChart;
