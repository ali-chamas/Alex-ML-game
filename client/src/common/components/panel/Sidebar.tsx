import { useContext, useState } from "react";
import { IconButton, Drawer } from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../../tools/request-method/request";
import { UserContext, UserContextType } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";

const Sidebar = ({ type }: { type: string }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const navigate = useNavigate();

  const { removeUser } = useContext(UserContext) as UserContextType;

  const logout = async () => {
    try {
      const res = await sendRequest("GET", "/auth/logout");
      removeUser();
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer
        className="bg-white/90 flex flex-col items-center gap-8 p-5"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <h1 className="flex gap-2 items-center text-2xl">
          <img src="/logo.png" className="w-[60px]" alt="" />
          Alex {type == "admin" ? "Admin" : "Creator"}
        </h1>

        <SidebarLinks type={type} setIsOpen={setIsDrawerOpen} />
        <button onClick={logout} className="btn-primary-danger mt-auto ">
          Logout
        </button>
      </Drawer>
    </>
  );
};
export default Sidebar;
