import React, { useState, useEffect } from "react";
import "./lineGraph.css";
import { Line } from "react-chartjs-2";
import { buildChartData } from "../../utils";
import { FormatListNumberedRtlSharp } from "@mui/icons-material";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio:false,
  tooltips:{
    mode:'index',
    intersect:false,
    callbacks:{
        label: function(tooltipItem,data){
            return FormatListNumberedRtlSharp(tooltipItem.value).format("+0.0")
        }
    }
  }
};
const LineGraph = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);
  return (
    <div className="lineGraph">
      <Line
        options={options}
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204,16,52,)",
              borderColor: "#cc1034",
              data: data,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;
