import Title from "../../../common/components/panel/Title";
import CounterCards from "../../creator/home/components/CounterCards";
import UsersTable from "./components/UsersTable";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 w-full ">
      <Title title="Dashboard" />
      <CounterCards />
      {/* <UsersTable /> */}
    </div>
  );
};

export default AdminHome;
