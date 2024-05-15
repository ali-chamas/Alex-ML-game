import UsersTable from "./components/UsersTable";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-10 w-full ">
      <div className="flex justify-between sticky top-0 bg-primary p-5 rounded-lg z-10">
        <h1 className="text-primary text-lg lg:text-3xl">Dashboard</h1>
      </div>
      {/* <CounterCards /> */}
      <UsersTable />
    </div>
  );
};

export default AdminHome;
