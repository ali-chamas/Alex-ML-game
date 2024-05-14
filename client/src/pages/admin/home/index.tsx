import UsersTable from "./components/UsersTable";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 w-full items-center">
      {/* <CounterCards /> */}
      <UsersTable />
    </div>
  );
};

export default AdminHome;
