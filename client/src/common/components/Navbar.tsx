import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="py-6 px-12 flex justify-between items-center">
      <div>
        <img src="/logo.png" alt="logo" className="w-[90px] h-[60px] " />
      </div>

      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
