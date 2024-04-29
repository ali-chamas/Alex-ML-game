import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "About", destination: "/about" },
    { name: "Contact", destination: "/contact" },
    { name: "Docs", destination: "/docs" },
  ];
  return (
    <div className=" flex justify-between items-center relative">
      <div className="flex gap-5 items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[80px] h-[60px] lg:w-[100px] lg:h-[80px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className=" gap-3 items-center hidden md:flex">
          {links.map((link: any, i: number) => (
            <button
              key={i}
              className="text-lg opacity-80 hover:opacity-100 transition-all duration-300"
              onClick={() => navigate(link.destination)}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <MobileMenu links={links} navigate={navigate} />
      </div>
      <button className="btn-primary-dark hidden md:block ">Login</button>
    </div>
  );
};

export default Navbar;
