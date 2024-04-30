import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInProtection = () => {
  const { token } = useContext(UserContext) as UserContextType;
  return token ? <Navigate to={"/profile"} /> : <Outlet />;
};

export default LoggedInProtection;
