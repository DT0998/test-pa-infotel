import * as d3 from "d3";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IBarchartProps, ITooltip } from "../../types/barchart.model";
import { useMediaQuery } from "usehooks-ts";
import Bar from "./Bar";

// bar chart component
function BarChart(props: IBarchartProps) {
  const isMobile = useMediaQuery("(max-width: 426px)");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [viewboxWidth, setViewboxWidth] = useState(0);
  const [viewboxHeight, setViewboxHeight] = useState(0);
  const { data } = props;
  console.log(data);
  const [tooltip, setTooltip] = useState<ITooltip | null>(null);
  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };

  const handleResizeChart = () => {
    if (isMobile) {
      setWidth(400 - margin.left - margin.right);
      setHeight(250 - margin.left - margin.right);
      setViewboxWidth(400);
      setViewboxHeight(250);
    } else {
      setWidth(150 - margin.left - margin.right);
      setHeight(150 - margin.left - margin.right);
      setViewboxWidth(200);
      setViewboxHeight(150);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeChart);
    return () => window.removeEventListener("resize", handleResizeChart);
  }, []);

  useLayoutEffect(() => {
    handleResizeChart();
  }, []);

  const propertyLabels = data.map(({ property }) => property);
  const totalRoomInHotelValues = data.map(
    ({ totalRoomInHotel }) => totalRoomInHotel
  );

  const scaleX = d3
    .scaleBand()
    .domain(propertyLabels)
    .range([0, width])
    .padding(0.2);

  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...totalRoomInHotelValues)])
    .range([height, 0]);

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
  }, [scaleX, scaleY]);

  return (
    <React.Fragment>
      <figure>
        <svg
          viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
          style={{ width: "100%", height: "100%" }}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
            <g ref={axisLeftRef} />
            {data.map(({ property, totalRoomInHotel }, groupIndex) => (
              <g key={`rect-group-${groupIndex}`}>
                {/* bar value */}
                <Bar
                  x={scaleX(property)}
                  y={scaleY(totalRoomInHotel)}
                  width={scaleX.bandwidth()}
                  height={height - scaleY(totalRoomInHotel)}
                  color="#126cea"
                  onMouseEnter={(event) => {
                    setTooltip({
                      x: event.clientX,
                      y: event.clientY,
                      index: groupIndex,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              </g>
            ))}
          </g>
        </svg>
      </figure>
      {tooltip !== null ? (
        <div
          className="tooltip fixed p-[0.75rem] bg-white rounded shadow-xl"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <span className="mb-[0.5rem]">{propertyLabels[tooltip.index]}</span>
          <table className="border-collapse">
            <thead>
              <tr>
                <td className="p-1 text-xs text-center">Total Room In Hotel</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalRoomInHotelValues[tooltip.index]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default BarChart;
