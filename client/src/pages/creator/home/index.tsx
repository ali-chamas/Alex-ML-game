import alexImg from "../../../assets/marco.png";
import DoughnutChart from "../../admin/home/components/DoughnutChart";
import CounterCards from "./components/CounterCards";
const CreatorHome = () => {
  return (
    <section className="flex flex-col items-center w-full mt-20 gap-20 ">
      <CounterCards />
      <div className="flex flex-col gap-2 items-center">
        <DoughnutChart />
      </div>
    </section>
  );
};

export default CreatorHome;
