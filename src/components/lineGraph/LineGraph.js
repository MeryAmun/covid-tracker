import React, { useState, useEffect } from "react";
import "./lineGraph.css";
import { Line } from "react-chartjs-2";
import { buildChartData } from "../../utils";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import numeral from "numeral";


const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Worldwide New Cases',
      },
    },
    elements: {
        point: {
          radius: 0,
        },
       
      },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxis: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxis: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          //Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const LineGraph = ({caseType='cases'}) => {
  const [data, setData] = useState({});
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data,caseType);
        setData(chartData);
      });
  }, []);
  return (
    <div className="lineGraph">
      {data?.length > 0 && (
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
      )}
    </div>
  );
};

export default LineGraph;
