import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";

const MobileMenu = ({ links, navigate }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="text-4xl "
        onClick={() => setOpen((o) => !o)}
      >
        <RxHamburgerMenu />
      </button>
      {open && (
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0, transition: { delay: 0.2, stiffness: 20 } }}
          className="flex flex-col bg-primary p-14 absolute top-18 right-2 text-md rounded-md items-center gap-5"
        >
          <div className="flex flex-col gap-5">
            {links.map((link: any, i: number) => (
              <button
                key={i}
                className="opacity-80 hover:opacity-100 transition-all duration-300"
                onClick={() => navigate(link.destination)}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button className="btn-primary-white">Login</button>
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenu;
