import alexImg from "../../../assets/marco.png";
import Title from "../../../common/components/panel/Title";
import DoughnutChart from "../../admin/home/components/DoughnutChart";
import CounterCards from "./components/CounterCards";
const CreatorHome = () => {
  return (
    <section className="flex flex-col items-center w-full  gap-7 ">
      <Title title="Dashboard" />
      <CounterCards />
      <div className="flex flex-col gap-2 items-center">
        <DoughnutChart />
      </div>
    </section>
  );
};

export default CreatorHome;
