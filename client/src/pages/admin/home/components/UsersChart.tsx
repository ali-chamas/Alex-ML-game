import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { sendRequest } from "../../../../tools/request-method/request";
import { useEffect } from "react";

const UsersChart = () => {
  const getRegistrations = async () => {
    try {
      const res = await sendRequest("GET", "/admin/get_registrations");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  return "hello";
};

export default UsersChart;
