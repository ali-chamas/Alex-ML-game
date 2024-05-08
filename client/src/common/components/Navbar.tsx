import { useContext } from "react";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/userContext";
import { apiUrl } from "../../tools/api-url/apiUrl";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../context/DarkModeContext";
const Navbar = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const { isDarkMode, toggleDarkMode } = useContext(
    DarkModeContext
  ) as DarkModeContextType;
  const navigate = useNavigate();

  const links = [
    { name: "About", destination: "/about" },
    { name: "Contact", destination: "/contact" },
  ];
  return (
    <header className=" flex justify-between items-center  h-[10vh]">
      <div className="flex gap-5 items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[80px] h-[60px] lg:w-[100px] lg:h-[80px] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <nav className=" gap-3 items-center hidden md:flex">
        {links.map((link: any, i: number) => (
          <button
            key={i}
            className="text-lg opacity-80 hover:opacity-100 transition-all duration-300"
            onClick={() => navigate(link.destination)}
          >
            {link.name}
          </button>
        ))}

        {user && (
          <button
            className="text-lg opacity-80 hover:opacity-100 transition-all duration-300"
            onClick={() => navigate("/games")}
          >
            games
          </button>
        )}
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={20}
        />
      </nav>

      <div className="md:hidden">
        <MobileMenu links={links} navigate={navigate} user={user} />
      </div>
      {!user ? (
        <button
          className="btn-primary-dark hidden md:block "
          onClick={() => navigate("/auth")}
        >
          Login
        </button>
      ) : (
        <img
          src={`${apiUrl}/${user.avatar}`}
          className=" w-[55px] lg:w-[70px] rounded-full hidden md:block cursor-pointer"
          onClick={() => navigate("/profile")}
          alt="profile"
        />
      )}
    </header>
  );
};

export default Navbar;
