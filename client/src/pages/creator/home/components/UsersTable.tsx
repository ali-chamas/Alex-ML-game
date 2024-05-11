import {
  Card,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { userType } from "../../../../tools/data-types/userType";
import { useContext, useEffect, useState } from "react";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";
import { UserContext, UserContextType } from "../../../../context/userContext";
const UsersTable = () => {
  const users = useSelector((state: any) => state.users.users);
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;
  const userContext = useContext(UserContext) as UserContextType;
  const activeUser = userContext.user;

  const [filteredUsers, setFilteredUsers] = useState<userType[] | []>(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users.length]);

  const TABLE_HEAD = [
    "First Name",
    "Last Name",
    "Username",
    "Age",
    "Role",
    "Delete",
  ];

  const TABLE_ROWS = filteredUsers;

  const searchFilter = (filter: string) => {
    const searchedUsers = users.filter(
      (user: userType) => user.username == filter
    );
    setFilteredUsers(searchedUsers);
  };

  const roleFilter = (filter: string) => {
    if (filter == "all") {
      setFilteredUsers(users);
    } else {
      const searchedUsers = users.filter(
        (user: userType) => user.role == filter
      );
      setFilteredUsers(searchedUsers);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl xl:text-2xl">{users.length} Users</h1>
        <div>
          <Input
            label="Search"
            type="search"
            color={isDarkMode ? "white" : "black"}
          />
        </div>
        <div>
          <Select label="Role">
            <Option value="admin">Admin</Option>
            <Option value="creator">Creator</Option>
            <Option value="user">User</Option>
          </Select>
        </div>
      </div>
      <Card className="h-[450px] overflow-auto w-full bg-white/0">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 ">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 dark:border-black bg-cyan-50  dark:bg-black/70 p-4 w-[10%]"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((user: userType, index: number) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50 dark:border-black";

              return (
                <tr
                  key={user._id}
                  className="even:bg-cyan-50 odd:bg-white/40 dark:even:bg-black/20 dark:odd:bg-[#031C28]"
                >
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.firstName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.lastName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.age}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.role}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {user._id === activeUser?._id ? (
                      <p>(You)</p>
                    ) : (
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="btn-primary-danger text-sm w-[90px]"
                      >
                        Delete
                      </Typography>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default UsersTable;
