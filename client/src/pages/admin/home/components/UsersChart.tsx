import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { sendRequest } from "../../../../tools/request-method/request";
import { useContext, useEffect, useState } from "react";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";

const UsersChart = () => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = isDarkMode ? "white" : "black";

  interface ChartDataType {
    _id: string;
    userCount: number;
  }

  const [registrations, setRegistrations] = useState([]);

  const getRegistrations = async () => {
    try {
      const res = await sendRequest("GET", "/admin/get_registrations");
      setRegistrations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  const chartData = {
    labels: registrations.map((reg: ChartDataType) => reg._id),
    datasets: [
      {
        label: "Number of Users",

        data: registrations.map((reg: ChartDataType) => reg.userCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        color: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  const chartOptions = {
    elements: {
      line: {
        tension: 10,
        fontColor: "green",
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "white" : "black",

          font: {
            size: 14,
          },
        },
        title: {
          text: "Daily Users",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? "white" : "black",

          beginAtZero: true,
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "white" : "black",

          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="h-[300px] max-w-[800px] w-full">
      <Line
        data={chartData}
        options={chartOptions}
        style={{ color: "white" }}
      />
    </div>
  );
};

export default UsersChart;
