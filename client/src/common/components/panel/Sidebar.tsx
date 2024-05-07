import React, { useContext } from "react";
import { IconButton, Drawer } from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../../tools/request-method/request";
import { UserContext, UserContextType } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

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
        className="bg-[#01141E] flex flex-col item-center p-5"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <h1 className="flex gap-2 items-center text-xl">
          <img src="/logo.png" className="w-[60px]" alt="" />
          Alex Creator
        </h1>
        <button onClick={logout} className="btn-primary-danger">
          Logout
        </button>
      </Drawer>
    </>
  );
};
export default Sidebar;
