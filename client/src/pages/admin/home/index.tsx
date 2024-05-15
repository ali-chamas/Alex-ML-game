import Title from "../../../common/components/panel/Title";
import CounterCards from "../../creator/home/components/CounterCards";
import UsersChart from "./components/UsersChart";
import UsersTable from "./components/UsersTable";
import DoughnutChart from "./components/DoughnutChart";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 w-full  items-center">
      <Title title="Dashboard" />
      <CounterCards />

      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <UsersChart />
        <div className="max-h-[400px]">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
