import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInProtection = () => {
  const { token } = useContext(UserContext) as UserContextType;
  return token ? <Navigate to={"/"} /> : <Outlet />;
};

export default LoggedInProtection;
