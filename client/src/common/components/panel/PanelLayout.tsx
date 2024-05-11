import { ReactNode, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { sendRequest } from "../../../tools/request-method/request";
import { useDispatch } from "react-redux";
import { setUsers } from "../../../redux/users";
import { UserContext, UserContextType } from "../../../context/userContext";

const PanelLayout = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string;
}) => {
  const dispatcher = useDispatch();

  const { user } = useContext(UserContext) as UserContextType;

  const getAllUsers = async () => {
    if (user?.role == "admin") {
      try {
        const res = await sendRequest("GET", "admin/get_users");
        dispatcher(setUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [user]);
  return (
    <section className="bg min-h-screen p-5 flex overflow-x-auto">
      <Sidebar type={type} />
      <div className="p-5 w-full h-full">{children}</div>
    </section>
  );
};

export default PanelLayout;
