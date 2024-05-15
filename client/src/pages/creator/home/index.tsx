import Title from "../../../common/components/panel/Title";
import DoughnutChart from "../../admin/home/components/DoughnutChart";
import CounterCards from "./components/CounterCards";
const CreatorHome = () => {
  return (
    <section className="flex flex-col items-center w-full  gap-10 ">
      <Title title="Dashboard" />
      <div className="flex flex-col gap-4 lg:flex-row w-full justify-evenly">
        <CounterCards type="creator" />
        <div className="flex flex-col gap-2 items-center">
          <DoughnutChart />
        </div>
      </div>
    </section>
  );
};

export default CreatorHome;
