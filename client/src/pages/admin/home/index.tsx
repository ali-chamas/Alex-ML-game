import Title from "../../../common/components/panel/Title";
import CounterCards from "../../creator/home/components/CounterCards";
import UsersChart from "./components/UsersChart";

import DoughnutChart from "./components/DoughnutChart";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 w-full  items-center">
      <Title title="Dashboard" />
      <CounterCards type="admin" />

      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <UsersChart />

        <DoughnutChart />
      </div>
    </div>
  );
};

export default AdminHome;
