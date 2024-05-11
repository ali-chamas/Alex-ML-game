import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { userType } from "../../../../tools/data-types/userType";
const UsersTable = () => {
  const users = useSelector((state: any) => state.users.users);

  const TABLE_HEAD = [
    "First Name",
    "Last Name",
    "Username",
    "Age",
    "Role",
    "Delete",
  ];

  const TABLE_ROWS = users;

  console.log(users);

  return (
    <Card className="h-[500px] overflow-auto w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[10%]"
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
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={user._id} className="even:bg-blue-gray-50/50">
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
