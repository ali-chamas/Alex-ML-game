import React from "react";
import { IconButton, Drawer } from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

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
      </Drawer>
    </>
  );
};
export default Sidebar;
