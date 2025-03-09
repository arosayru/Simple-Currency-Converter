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
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
      }
    ]
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://v6.exchangerate-api.com/v6/72427cd09834ad58b23cd29d/latest/USD");
        const rates = response.data.conversion_rates;
        const currentTime = new Date().toLocaleTimeString(); 

        setChartData((prevData) => ({
          labels: [...prevData.labels.slice(-9), currentTime], 
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(-9), rates["LKR"]], 
            }
          ]
        }));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates(); 
    const interval = setInterval(fetchRates, 30000); 

    return () => clearInterval(interval); 
  }, []);

  return <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default ExchangeRateChart;
