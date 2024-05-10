import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import { sendRequest } from "../../../tools/request-method/request";
import { useDispatch } from "react-redux";
import { setUsers } from "../../../redux/users";

const PanelLayout = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string;
}) => {
  const dispatcher = useDispatch();

  const getAllUsers = async () => {
    try {
      const res = await sendRequest("GET", "creator/get_users");
      dispatcher(setUsers(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <section className="bg min-h-screen flex">
      <Sidebar type={type} />
      {children}
    </section>
  );
};

export default PanelLayout;
