import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { userType } from "../../../../tools/data-types/userType";
import { useEffect, useState } from "react";
const UsersTable = () => {
  const users = useSelector((state: any) => state.users.users);

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

  return (
    <Card className="h-[500px] overflow-auto w-full bg-white/0">
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
                className="even:bg-cyan-50 dark:even:bg-black/20 dark:odd:bg-[#031C28]"
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
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="btn-primary-danger text-sm w-[90px]"
                  >
                    Delete
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default UsersTable;
