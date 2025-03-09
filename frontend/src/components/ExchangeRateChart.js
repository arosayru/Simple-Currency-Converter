import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExchangeRateChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Exchange Rate (USD to LKR)",
        data: [],
        borderColor: "green",
        fill: false,
      }
    ]
  });

  useEffect(() => {
    const fetchRates = async () => {
      const response = await axios.get("https://v6.exchangerate-api.com/v6/YOUR_API_KEY_HERE/latest/USD");
      const rates = response.data.conversion_rates;
      setChartData({
        labels: Object.keys(rates).slice(0, 10),
        datasets: [
          {
            label: "Exchange Rate (USD to LKR)",
            data: Object.values(rates).slice(0, 10),
            borderColor: "green",
            fill: false,
          }
        ]
      });
    };

    fetchRates();
  }, []);

  return <Line data={chartData} />;
};

export default ExchangeRateChart;
