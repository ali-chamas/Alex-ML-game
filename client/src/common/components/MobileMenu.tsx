import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { apiUrl } from "../../tools/api-url/apiUrl";
import { IoCloseOutline } from "react-icons/io5";
import Hamburger from "hamburger-react";

const MobileMenu = ({ links, navigate, user }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="text-4xl "
        onClick={() => setOpen((o) => !o)}
      >
        <Hamburger onToggle={(open) => !open} />
      </button>
      {open && (
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0, transition: { delay: 0.2, stiffness: 20 } }}
          className="flex flex-col bg-primary p-14 absolute top-18 right-2 text-md rounded-md items-center gap-5 z-40"
        >
          <div className="flex flex-col gap-5">
            {links.map((link: any, i: number) => (
              <button
                key={i}
                className=" hover:opacity-80 transition-all duration-300"
                onClick={() => navigate(link.destination)}
              >
                {link.name}
              </button>
            ))}
            {user && (
              <button className="hover:opacity-80 transition-all duration-300">
                games
              </button>
            )}
          </div>

          {!user ? (
            <button className="btn-primary-white">Login</button>
          ) : (
            <img
              src={`${apiUrl}/${user.avatar}`}
              className=" w-[60px] rounded-full"
              onClick={() => navigate("/profile")}
              alt="profile"
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenu;
