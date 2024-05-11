import CounterCards from "../../creator/home/components/CounterCards";
import UsersTable from "../../creator/home/components/UsersTable";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 m-5 md:m-10 w-full items-center">
      <CounterCards />
      <UsersTable />
    </div>
  );
};

export default AdminHome;
