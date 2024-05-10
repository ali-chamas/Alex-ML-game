import alexImg from "../../../assets/marco.png";
import CounterCards from "./components/CounterCards";
const CreatorHome = () => {
  return (
    <section className="flex flex-col items-center w-full mt-20 gap-20 ">
      <CounterCards />
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-primary md:text-xl lg:text-2xl xl:text-4xl">
          LET'S CREATE GREAT THINGS
        </h1>
        <img src={alexImg} className=" w-[250px] sm:w-[300px] " alt="alex" />
      </div>
    </section>
  );
};

export default CreatorHome;
