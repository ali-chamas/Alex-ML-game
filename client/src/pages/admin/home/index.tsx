import CounterCards from "../../creator/home/components/CounterCards";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 m-5 md:m-10 w-full items-center">
      <div className="flex gap-3">
        <CounterCards />
      </div>
    </div>
  );
};

export default AdminHome;
