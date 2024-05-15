import { useContext, useState } from "react";
import { IconButton, Drawer, Card } from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../../tools/request-method/request";
import { UserContext, UserContextType } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";
import DarkModeToggler from "../DarkModeToggler";

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
      <IconButton
        variant="text"
        size="lg"
        onClick={openDrawer}
        className="lg:hidden"
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer
        className="bg-gradient-to-tr from-white to-cyan-50 dark:from-[#031C28] dark:to-[#031C28] flex flex-col items-center gap-8 p-5 "
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
      <Card
        className="bg-gradient-to-tr rounded-none  w-[300px] from-white  to-cyan-50 dark:from-[#031C28] dark:to-[#031C28]  flex-col items-center gap-8 p-5 hidden lg:flex"
        open={true}
      >
        <h1 className="flex gap-2 items-center text-2xl">
          <img src="/logo.png" className="w-[60px]" alt="" />
          Alex {type == "admin" ? "Admin" : "Creator"}
        </h1>

        <SidebarLinks type={type} setIsOpen={setIsDrawerOpen} />
        <div className="flex gap-4 items-center  mt-auto">
          <DarkModeToggler />
          <button onClick={logout} className="btn-primary-danger ">
            Logout
          </button>
        </div>
      </Card>
    </>
  );
};
export default Sidebar;
