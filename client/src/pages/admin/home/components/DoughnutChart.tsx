import { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { sendRequest } from "../../../../tools/request-method/request";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";

const DoughnutChart = () => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;
  const [finishedData, setFinishedData] = useState();

  const fetchData = async () => {
    try {
      const res = await sendRequest("GET", "/creator/get_finished_users");
      setFinishedData(res.data);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(finishedData);

  // return <Doughnut data={chartData} />;
  return (
    finishedData && (
      <div className="w-[400px] h-[400px] bg-primary rounded-lg p-6 items-center flex flex-col gap-4">
        <h1 className="text-primary text-lg lg:text-xl">Completed Accounts</h1>
        <Doughnut
          style={{ width: 300, height: 320 }}
          data={{
            labels: ["finished", "unfinished"],

            datasets: [
              {
                label: "Count",
                data: [finishedData["finished"], finishedData["notFinished"]],
              },
            ],
          }}
          options={{
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

              title: {
                text: "Revenue Sources",
              },
            },
          }}
        />
      </div>
    )
  );
};

export default DoughnutChart;
