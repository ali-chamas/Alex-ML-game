import Title from "../../../common/components/panel/Title";
import UsersTable from "../home/components/UsersTable";

const AdminUsers = () => {
  return (
    <div className="flex flex-col  gap-[80px]">
      <Title title="Users" />
      <UsersTable />
    </div>
  );
};

export default AdminUsers;
